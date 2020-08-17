@rem
@rem Copyright 2020 the original author jacky.eastmoon
@rem All commad module need 3 method :
@rem [command]        : Command script
@rem [command]-args   : Command script options setting function
@rem [command]-help   : Command description
@rem Basically, CLI will not use "--options" to execute function, "--help, -h" is an exception.
@rem But, if need exception, it will need to thinking is common or individual, and need to change BREADCRUMB variable in [command]-args function.
@rem NOTE, batch call [command]-args it could call correct one or call [command] and "-args" is parameter.
@rem

:: ------------------- batch setting -------------------
@rem setting batch file
@rem ref : https://www.tutorialspoint.com/batch_script/batch_script_if_else_statement.htm
@rem ref : https://poychang.github.io/note-batch/

@echo off
setlocal
setlocal enabledelayedexpansion

:: ------------------- declare CLI file variable -------------------
@rem retrieve project name
@rem Ref : https://www.robvanderwoude.com/ntfor.php
@rem Directory = %~dp0
@rem Object Name With Quotations=%0
@rem Object Name Without Quotes=%~0
@rem Bat File Drive = %~d0
@rem Full File Name = %~n0%~x0
@rem File Name Without Extension = %~n0
@rem File Extension = %~x0

set CLI_DIRECTORY=%~dp0
set CLI_FILE=%~n0%~x0
set CLI_FILENAME=%~n0
set CLI_FILEEXTENSION=%~x0

:: ------------------- declare CLI variable -------------------

set BREADCRUMB=cli
set COMMAND=
set COMMAND_BC_AGRS=
set COMMAND_AC_AGRS=

:: ------------------- declare variable -------------------

for %%a in ("%cd%") do (
    set PROJECT_NAME=%%~na
)
set PROJECT_ENV=dev

:: ------------------- execute script -------------------

call :main %*
goto end

:: ------------------- declare function -------------------

:main (
    call :argv-parser %*
    call :%BREADCRUMB%-args %COMMAND_BC_AGRS%
    call :main-args %COMMAND_BC_AGRS%
    IF defined COMMAND (
        set BREADCRUMB=%BREADCRUMB%-%COMMAND%
        call :main %COMMAND_AC_AGRS%
    ) else (
        call :%BREADCRUMB%
    )
    goto end
)
:main-args (
    for %%p in (%*) do (
        if "%%p"=="-h" ( set BREADCRUMB=%BREADCRUMB%-help )
        if "%%p"=="--help" ( set BREADCRUMB=%BREADCRUMB%-help )
    )
    goto end
)
:argv-parser (
    set COMMAND=
    set COMMAND_BC_AGRS=
    set COMMAND_AC_AGRS=
    set is_find_cmd=
    for %%p in (%*) do (
        IF NOT defined is_find_cmd (
            echo %%p | findstr /r "\-" >nul 2>&1
            if errorlevel 1 (
                set COMMAND=%%p
                set is_find_cmd=TRUE
            ) else (
                set COMMAND_BC_AGRS=!COMMAND_BC_AGRS! %%p
            )
        ) else (
            set COMMAND_AC_AGRS=!COMMAND_AC_AGRS! %%p
        )
    )
    goto end
)

:: ------------------- Main mathod -------------------

:cli (
    goto cli-help
)

:cli-args (
    goto end
)

:cli-help (
    echo This is a Command Line Interface with project %PROJECT_NAME%
    echo If not input any command, at default will show HELP
    echo.
    echo Options:
    echo      --help, -h        Show more information with CLI.
    echo.
    echo Command:
    echo      gitbook           Build Resume PDF file by gitbook tool.
    echo      ebook             Build Resume PDF file by self-defined page.
    echo      website           Startup a website to shown resume data.
    echo.
    echo Run 'cli [COMMAND] --help' for more information on a command.
    goto end
)

:: ------------------- Command "gitbook" mathod -------------------

:cli-gitbook (
    echo ^> Build ebook Docker images with gitbook tools
    docker build --rm -t resume-gitbook:%PROJECT_NAME% ./docker/gitbook

    echo ^> Copy document into tmp directory
    IF NOT EXIST build\tmp-gitbook (
        mkdir build\tmp-gitbook
    )
    IF NOT EXIST build\pdf (
        mkdir build\pdf
    )
    xcopy /Y /E doc build\tmp-gitbook
    xcopy /Y /E node\gitbook\*.* build\tmp-gitbook

    echo ^> Startup docker container instance
    IF defined EBOOK_DEVELOPER (
        docker run -ti --rm^
            -v %cd%\build\tmp-gitbook:/repo/^
            -v %cd%\build\pdf:/repo/build/^
            resume-gitbook:%PROJECT_NAME% bash
    ) else (
        docker run -ti --rm^
            -v %cd%\build\tmp-gitbook:/repo/^
            -v %cd%\build\pdf:/repo/build/^
            resume-gitbook:%PROJECT_NAME% bash -l -c "yarn pdf"
    )
    goto end
)

:cli-gitbook-args (
    for %%p in (%*) do (
        if "%%p"=="--dev" ( set EBOOK_DEVELOPER=1 )
    )
    goto end
)

:cli-gitbook-help (
    echo Build Resume PDF file, using Docker container with node.js images and gitbook tool.
    echo.
    echo Options:
    echo      --dev             Build Docker iamges and into container. it is work for developer.
    echo.
    goto end
)

:: ------------------- Command "ebook" mathod -------------------

:cli-ebook (
    echo ^> Build ebook Docker images with gitbook tools
    docker build --rm -t resume-ebook:%PROJECT_NAME% ./docker/ebook

    echo ^> Copy document into tmp directory
    IF NOT EXIST build\tmp-ebook (
        mkdir build\tmp-ebook
    )
    IF NOT EXIST cache\ebook (
        mkdir cache\ebook
    )
    IF NOT EXIST build\pdf (
        mkdir build\pdf
    )

    echo ^> Upgrade library

    docker run -ti --rm^
        -v %cd%\node\ebook:/repo/^
        -v %cd%\cache\ebook:/repo/node_modules^
        resume-ebook:%PROJECT_NAME% bash -l -c "yarn install"

    echo ^> Startup docker container instance
    IF defined EBOOK_DEVELOPER (
        docker run -ti --rm^
            -v %cd%\node\ebook:/repo/^
            -v %cd%\cache\ebook:/repo/node_modules^
            -v %cd%\build:/repo/build/^
            -v %cd%\doc:/repo/data/^
            resume-ebook:%PROJECT_NAME% bash
    ) else (
        docker run -ti --rm^
            -v %cd%\node\ebook:/repo/^
            -v %cd%\cache\ebook:/repo/node_modules^
            -v %cd%\build:/repo/build/^
            -v %cd%\doc:/repo/data/^
            resume-gitbook:%PROJECT_NAME% bash -l -c "yarn build"
    )
    goto end
)

:cli-ebook-args (
    for %%p in (%*) do (
        if "%%p"=="--dev" ( set EBOOK_DEVELOPER=1 )
    )
    goto end
)

:cli-ebook-help (
    echo Build Resume PDF file, using Docker container with node.js images.
    echo It will parser Markdown file and retrieve information to using at generate self-defined resume.
    echo.
    echo Options:
    echo      --dev             Build Docker iamges and into container. it is work for developer.
    echo.
    goto end
)

:: ------------------- Command "website" mathod -------------------

:cli-website (
    echo ^> Build ebook Docker images with gitbook tools
    docker build --rm -t resume-website:%PROJECT_NAME% ./docker/website

    echo ^> Copy document into tmp directory
    IF NOT EXIST cache\website (
        mkdir cache\website
    )

    echo ^> Upgrade library

    docker run -ti --rm^
        -v %cd%\node\website:/repo/^
        -v %cd%\cache\website:/repo/node_modules^
        resume-ebook:%PROJECT_NAME% bash -l -c "yarn install"

    echo ^> Startup docker container instance
    IF defined WEBSITE_STARTUP (
        docker run -ti --rm^
            -v %cd%\node\website:/repo/^
            -v %cd%\cache\website:/repo/node_modules^
            -v %cd%\doc:/repo/data/^
            -p 8080:80^
            resume-ebook:%PROJECT_NAME% bash
    ) else (
        IF defined WEBSITE_DEVELOPER (
            docker run -ti --rm^
                -v %cd%\node\website:/repo/^
                -v %cd%\cache\website:/repo/node_modules^
                -v %cd%\doc:/repo/data/^
                -p 8080:80^
                resume-ebook:%PROJECT_NAME% bash -l -c "yarn development"
        ) else (
            docker run -ti --rm^
                -v %cd%\node\website:/repo/^
                -v %cd%\cache\website:/repo/node_modules^
                -v %cd%\doc:/repo/data/^
                -p 8080:80^
                resume-gitbook:%PROJECT_NAME% bash -l -c "yarn build && yarn start"
        )
    )
    goto end
)

:cli-website-args (
    for %%p in (%*) do (
        if "%%p"=="--dev" ( set WEBSITE_DEVELOPER=1 )
        if "%%p"=="--up" ( set WEBSITE_STARTUP=1 )
    )
    goto end
)

:cli-website-help (
    echo Startup resume website, using Docker container with node.js images.
    echo It will parser Markdown file and retrieve information to shown on website.
    echo.
    echo Options:
    echo      --dev             Build Docker iamges and into container with node server. it is work for developer.
    echo      --up              Build Docker iamges and into container. it is work for developer.
    echo.
    goto end
)

:: ------------------- End method-------------------

:end (
    endlocal
)

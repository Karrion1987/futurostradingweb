@echo off
setlocal enabledelayedexpansion

set PORT=3003
for /f "tokens=5" %%a in ('netstat -ano ^| findstr /r /c:":%PORT% .*LISTENING"') do (
    echo Terminando el proceso con PID: %%a
    taskkill /F /PID %%a
)

echo Todos los procesos en el puerto %PORT% han sido terminados.
pause
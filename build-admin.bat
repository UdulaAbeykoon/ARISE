@echo off
echo Building ARISE with elevated permissions...
cd /d "%~dp0"
powershell -Command "Start-Process cmd -ArgumentList '/c cd /d \"%~dp0\" && npm run build && pause' -Verb RunAs"

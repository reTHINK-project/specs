@echo off
del rethink-data-model.md

for /r "." %%F in (*.json) do (  echo.####%%~nF >>rethink-data-model.md & echo. ```javascript >> rethink-data-model.md & type "%%F" >>rethink-data-model.md & echo. ``` >>rethink-data-model.md)


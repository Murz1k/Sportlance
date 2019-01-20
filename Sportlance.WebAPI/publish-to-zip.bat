del ..\site.zip
del ..\sportlance-api.zip
rd /S /Q ..\site
dotnet publish -o ../site
cd ../
powershell Compress-Archive site site.zip
rd /S /Q site
powershell Compress-Archive -Path site.zip, aws-windows-deployment-manifest.json -DestinationPath sportlance-api.zip
del site.zip
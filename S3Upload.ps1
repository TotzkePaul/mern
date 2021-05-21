$ErrorActionPreference = "Stop"
Write-Host "S3 Upload"
New-Item -ItemType Directory -Force -Path .\.build\
Remove-Item .\.build\mern-stack\* -Recurse -Force
#Get-ChildItem -Path  -Include * -File -Recurse | ForEach-Object { $_.Delete()}

$index_only = $false

if($index_only){
    Copy-Item -Path .\server\index.js -Destination .\.build\mern-stack\ 
} else {
    Copy-Item -Path .\server\* -Destination .\.build\mern-stack\ -Recurse
}

Compress-Archive -Path .\.build\mern-stack\* -DestinationPath .\.build\mern-stack.zip -Force

Get-FileHash .\.build\mern-stack.zip

#aws s3 cp .\.build\mern-stack.zip s3://mern-tutor/server.zip

aws lambda update-function-code --function-name mern-stack --zip-file fileb://.build/mern-stack.zip
SET var=%cd%
cd C:\Program Files\Amazon\AWSCLI\bin\
aws s3 sync "%var%"/dist/ s3://sportlance-prod-front --acl public-read --delete --profile admin
exit

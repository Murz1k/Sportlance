SET var=%cd%
cd C:\Program Files\Amazon\AWSCLI\bin\
aws s3 sync "%var%"/dist/ s3://sportlance.com --acl public-read --delete --profile admin
aws cloudfront create-invalidation --distribution-id EMT5GAO7EBY6Z --paths "/*" --profile admin
exit
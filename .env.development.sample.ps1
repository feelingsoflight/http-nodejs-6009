# see
# https://console.cloud.google.com/apis/credentials
$env:RNSERVER_GOOGLE_KEY=(
    "-----BEGIN PRIVATE KEY-----\n{key}\n-----END PRIVATE KEY-----\n"
).replace('\n', "`n")
$env:RNSERVER_GOOGLE_EMAIL="{email}"

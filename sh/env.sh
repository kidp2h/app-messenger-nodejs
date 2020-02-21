# config database use enviroment variable

export DB_CONNECTION=mongodb
export DB_HOST=localhost
export DB_PORT=27017
export DB_NAME=app_messenger
export DB_USERNAME=""
export DB_PASSWORD=""

#config email server

export MAIL_USERNAME=thjnhsoajca@gmail.com
export MAIL_PASSWORD=sliverdz2604
export MAIL_HOST=smtp.gmail.com
export MAIL_PORT=587

#config app login with facebook

export FB_CLIENT_ID=2631634573772632
export FB_KEY_SECRET=7b3daf16900b4be3751924c8e2e1a085
export FB_CALLBACK_URL=https://localhost:3000/users/auth/facebook/callback

#config app login with google

export GG_CLIENT_ID=780020074605-6dpr7dhkerr32iara534gdbnggkeshv9.apps.googleusercontent.com
export GG_KEY_SECRET=Y7XCkOWc0v3_PLA_CyRNaP66
export GG_CALLBACK_URL=https://localhost:3000/users/auth/google/callback
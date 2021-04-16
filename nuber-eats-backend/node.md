>nest g mo restaurants

>lsof -i:3000
>kill 4224

>yarn add @nestjs/typeorm typeorm pg

# Restaurants
- Edit Restaurant
- Delete Restaurant

- See Categories
- See Restaurants by Category (pagination)
- See Restaurants (pagination)
- See Restaurant

- Create Dish
- Edit Dish
- Delete Dish

# generate module users
>nest g mo users

>nest g mo jwt - this means nest generate module name 'jwt'
>nest g s jwt

## User Entity:
- id
- createAt
- updateAt
- 
- email
- password
- role(client|owner|delivery)

## User CRUD:

- Create Account
- Log In
- See Profile
- Edit Profile
- 

# About mailgun
- the best service
- fake sms - receive-smss.com/sms/
- moudle nestjs mailer - https://github.com/nest-modules/mailer



# Info
password to pgAdmin is 123456
password to user postgres is 123456
current directory > pwd
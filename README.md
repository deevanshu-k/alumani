# Alumni Registration Form
## Technoledgy Used:
- Architecture (**MVC**)
- Nodejs ( **BackEnd** )
- Express ( **Web application framework** )
- ejs ( **Template engine** )
- DataBase ( **MySql / PostgreSQL**)

## For Deploy
- Set DB config in .env file
    ```
    NODE_ENV='production'
    PORT='3000'

    P_db_name='alumnis'
    P_db_username='userName'
    P_db_password='User@12345'
    P_db_host='127.0.0.1'
    P_db_dialect='mysql'
    P_db_logging=1
    ```

- Make uploads folder on root
- Unzip uploads_photos.zip to uploads
- RUN ``npm start``
**NOTE: Tables created automatically**
## For Development
- Set DB config in .env file
    ```
    NODE_ENV='development'
    PORT='3000'

    D_db_name='alumnis'
    D_db_username='userName'
    D_db_password='User@12345'
    D_db_host='127.0.0.1'
    D_db_dialect='mysql'
    D_db_logging=1
    ```

- Make uploads folder on root
- RUN ``npm run start:dev``


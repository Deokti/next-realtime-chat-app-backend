# Чат на React и Next (Backend)

Создание приложения для общения и, что собственно более верное описание мотивации – практика.

## Технологии (Backend)

- TypeScript
- NodeJS / Express (routing)
- InversifyJS
- Nodemoon (для пересборки приложения)
- JWT
- SocketIO
- class-validator (для валидации входящих данных, например, при авторизации)
- multer (загрузка файлов)

## Code Style

- Prettier
- Eslint

## Для хранения данных

- MongoDB (база данных) / mongoose
- Cloudinary (хранение изображений, аудио сообщений)

# Использование

Некоторые из файлов используют данные, берущиеся из .env файла.

- PORT (необязательно) - если не указан, по умолчанию 8000
- DATABASE_URL (обязательно) - URL для подключения к БД.

# API

## Авторизация

Для регистрации и авторизации используются следующие методы

### Login (POST)

```
curl POST http://localhost:8000/auth/login
```

В теле запроса принимает `email` и `password`.

Если информация указывается верно, обратно возвращается объект, состоящий из `JWT Token` и `Refresh JWT Token`.

Если информация указана неверно, возвращается `422` ошибка.

### Register (POST)

```
curl POST http://localhost:8000/auth/register
```

В теле запроса принимает `email`, `username`, `password`.

Далее пароль хешируется (пока тестируется как именно):

После регистрации возвращается объект, состоящий из `_id`, `JWT Token` и `Refresh JWT Token`.

## Users

Для обращения к пользователям, или получение пользователя/пользователей.

### GET USER (GET)

Получать пользователя можно по `ID` и `email`.

```javascript
// Получение по `ID`
curl GET http://localhost:8000/?id=62b328ad8113324546e5b76c

// Получение по `EMAIL`
curl GET http://localhost:8000/?email=test@test.com
```

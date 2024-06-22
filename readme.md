## Aton-task

### Описание:
Проект представляет собой веб-приложение для управления клиентами, реализованное с использованием Docker и Node.js. Приложение включает базу данных SQLite для хранения данных о клиентах и пользователях, а также серверную и клиентскую части, которые взаимодействуют через REST API.

----

### Содержание:
1. [Инструкция по развертыванию Docker и базовых команд](./readme/dockerCommands.md)
2. [Базовая информация по приложению](./readme/basicInfo.md)

----

### Структура проекта:
 - app/backend (серверная/апишная часть)
   - Использовал Node.js с Express.js для обработки http запросов.
   - Использовал SQLite для хранения данных о клиентах и пользователей.
     - create.sqlite.sql - скрипт для создания бд
     - insert_data.sqlite.sql - скрипт для вставки тестовых данных
   - REST API для авторизации пользователей, выдачи клиентов и изменения статусов.
 - app/frontend (клиентская часть)

### Реализованно:
**Авторизация пользователя**
 - Самая примитивная авторизация, т.к в задании нет указаний.
 - Пользователь вводит логин и пароль. Если данные верны, пользователь получает доступ к управлению клиентами.

**Управление клиентами**
 - После успешной авторизации пользователь видит таблицу клиентов, за которых он ответственен. Пользователь может изменять статусы клиентов на "В работе", "Отказ" или "Сделка закрыта" с помощью выпадающего списка.

----

### Запуск проекта:
 - Используйте Docker.
 - Обязательно обратитесь к [базовой настройке приложения](./readme/basicInfo.md)
 - В корневой директории проекта выполните `docker-compose up --build`.
 - Если выпадет exception в контейнере atom-api, то удалите node_modules с локальной директории backend и заново соберите образ docker. Происходит это из-за конфликта платформ.

----

### Пример авторизации для клиентской части:
Данные взяты из тестовых данных для вставки из файла [insert_data.sqlite.sql](./app/backend/SQLite/insert_data.sqlite.sql) 
 - **Логины:** 
   - _ivanov_ 
   - _petrov_ 
   - _sidorov_
 - **Пароль:** _qwerty123_

----

LICENSE: [Лицензионное соглашение](./readme/license.md)

---

AUTHOR: PoppieHub@GitHub
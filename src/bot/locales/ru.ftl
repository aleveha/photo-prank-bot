-accept-policy-message = <i>Используя этого бота, вы соглашаетесь с нашей политикой конфиденциальности!</i>

start-command =
    { -accept-policy-message }
    /privacy

    Отправь одну из приведенных ниже ссылок своей жертве, чтобы сделать секретное фото 📸

disable-group-chats-event =
    .message = К сожалению, я работаю только в личных сообщениях 🙁
    .button = 🔗 Получить уникальную ссылку

my-chat-member-event =
    ⚠️ <b>ВНИМАНИЕ</b> ⚠️

    Вы запретили мне отправлять фотографии!

    Пожалуйста, учитывайте, что <b>я не могу нормально функционировать без этого разрешения!</b>

privacy-policy-command =
    <b>Политика конфиденциальности:</b>

    1. Этот бот предназначен <b>ИСКЛЮЧИТЕЛЬНО</b> для: розыгрышей/шуток и/или контролируемых тестовых сценариев.

    2. Не делитесь ссылкой с незнакомыми людьми.

    3. Бот и связанный с ним веб-сайт <b>НЕ ХРАНЯТ</b> никаких пользовательских данных, кроме ID пользователя. Бот <b>НЕ ХРАНИТ никаких фотографий</b>! Рабочий процесс следующий: веб-сайт => бот => конечный пользователь.

    4. Строго запрещено делиться ссылкой, запрашивающей что-либо, запрещенное правилами Telegram или законом. После получения фотографии вы можете отправить ее на проверку. В случае нарушения IP-адрес отправителя, отправившего фото, будет заблокирован!

    5. Ложные жалобы, засоряющие нашу систему, строго запрещены и строго наказываются.

    6. Бот не предназначен для использования в качестве оружия для взлома. Уважайте других пользователей и их личное пространство.

    { -accept-policy-message }

    { $url }

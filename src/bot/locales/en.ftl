-accept-policy-message = <i>By using this bot, you agree to our /privacy policy!</i>

start-command =
	.description = Getting started
    .message =
        { -accept-policy-message }

        📸 <b>Get your links to prank your friends:</b> /links

        <blockquote>
        We strictly follow Telegrams guidelines to ensure a safe and compliant environment.
        </blockquote>

    .get-links-button = 📸 Get your unique links!
    .privacy-policy-button = 🔒 Privacy policy
    .channel-button = 🔉 Channel
    .chat-button = 💭 Chat

links-command =
	.description = Obtain your unique links! 📸
	.message = Send one of the links below to your victim to snap a secret photo 📸

disable-group-chats-event =
    .message = Unfortunately, I am only available in private chats 🙁
    .button = 📸 Get your unique link

my-chat-member-event =
    ⚠️ <b>WARNING</b> ⚠️

    You have restricted me from sending photos!

    Please note, <b>I can't function properly without this permission!</b>

privacy-command =
    .description = Learn more about our privacy policy!
    .message =
        <b>Privacy policy:</b>

        1. This bot is exclusively intended <b>ONLY</b> for: pranks/jokes, and/or controlled testing scenarios.

        2. Don't share the link with someone you don't know.

        3. The bot and its associated website <b>DO NOT</b> store any user data other than user ID. The bot <b>DOES NOT store any photos</b>! The workflow is as follows: website => bot => end user.

        4. It is strictly forbidden to share a link requesting anything prohibited by Telegram rules or the law. After receiving a photo, you may send it for inspection. In case of violation, the IP of the sender who sent the photo will be blocked!

        5. False complaints clogging our system are strictly prohibited and strongly punished.

        6. The bot is not intended to be used as a weapon for hacking. Respect other users and their privacy.

        { -accept-policy-message }

        { $url }

subscription-check =
    .message =
        🤔 It seems <b>you are not subscribed to our channel yet...</b>

        Subscribe using the link below and get your prank links 📸
    .subscribe-button = 🔉 Subscribe to the channel
    .check-button = 🔄 Check subscription

report-command =
    .warning-message =
        🚨 <b><u>Are you sure you want report this message?</u></b> 🚨

        <b>False reports are strictly prohibited and could lead to being banned!</b>
    .report-button = 🚨 I'm sure, report!
    .cancel-button = ❌ No, cancel!
    .rate-limit-message =
        <b>You are reporting too frequently!

        Please report reasonably, or you may get banned!</b>
    .success-message =
        <b><u>Your report #{ $reportId } has been successfully submitted!</u></b>

        <b>Thank you for helping us maintain a safe community!</b>
    .report-violation-button = 🚨 Report violation
    .report-spam-button = 📢 Report spam

-violations-continues-message = If user continues to violate the rules, you can ban them.
restrict-command =
    .database-error-message = 🚫 <b>Database error!</b>
    .chat-not-found-message =
        ❌ <b>Chat not found in database!</b> ❌

        Probably bot is already blocked by this user. No futher action needed.
    .already-warned-message =
        ⚠️ <b>This user has already been warned!</b> ⚠️

        <b>Another warning has been sent anyway!</b>

        { -violations-continues-message }
    .already-banned-message =
        ❌ <b>This user has already been banned!</b> ❌

        No further action needed.
    .successfully-warned-message =
        ⚠️ <b>User has been warned!</b> ⚠️

        { -violations-continues-message }
    .warning-message =
        ⚠️ <b><u>Warning!</u></b> ⚠️

        <b>You have been warned for violating the rules (e.g. false complaints).
        If you continue to violate the rules, you will be banned.</b>
    .ban-message =
        ❌ <b><u>You have been banned for violating the rules</u></b> ❌
    .successfully-banned-message =
        ❌ <b>User has been banned!</b> ❌

language-command =
	.description = Change the language 🌐
    .choose-option-message = 🌐 Select your language:
    .en-button = 🇬🇧 English
    .ru-button = 🇷🇺 Russian
    .same-language-message = 🤔 You are already using this language!
    .success-message = 🌐 Your language has been successfully changed!
    .error-message = 🚫 An error occurred while changing the language!

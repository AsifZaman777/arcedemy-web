# Arcedemy app
<h4>Intro:</h4>'Arcedemy' is a learning app for Cambridge students and the Edexcel curriculum. The motto of the app is to learn by playing quizzes and fun competitive rooms with friends. Students can enjoy live exam rooms, a library and resources, and watch their regular progress by using the app.
<h4>Technical architecture:</h4> 

The whole system architecture is very simple. Admins can upload the resources through a `web-module` and using an API we will serve the resources to the main `app-module`.

## Web module
<h4>Brainstorming and design:</h4>

- `Web-module` is basically to handle the admin functionalities like resource uploading, user management, and so on.
- Client-side includes a landing page where some raw data will be shown about the academy and users can directly send the mails and DM to customer care.
  
<h4>Admin dashboard navigation design and prototype</h4> 

- We have used `figma` to design the  `web module navigation planning` and `dashboard prototyping`
- Admin dashboard prototype: <a href="https://www.figma.com/proto/vZOPQH5mdcIv58d7WFGIGZ/Arcedemy-app?page-id=872%3A634&node-id=872-637&viewport=944%2C-607%2C1.16&t=2FyICIuUS6bIeoUY-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=872%3A637">prototype</a>

<b>Dashboard design:</b>

![dashboard1](https://github.com/user-attachments/assets/22296f7e-d974-4b89-82c4-87bc5b2046fc)
![dashboard2](https://github.com/user-attachments/assets/d44ddead-b361-4e99-8256-d1690883d2d5)

<b>Web module navigation planning:</b>

<img width="3792" alt="web module navigation planning" src="https://github.com/user-attachments/assets/a52811fb-31ae-4730-b0f4-85e62430f44b">


## App module


<p align="center">
<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&duration=1&pause=1000&color=8EF720&width=435&lines=Introduction&center=true&vCenter=true" alt="Typing SVG" /></a></p>

**`This app aims to automate, simplify, and enhance the process of notifying employees across various companies. To achieve this goal, the system offers various channels, namely Emails, SMS, and postal mail. Each of these options is designed for specific scenarios and requires specific configurations to ensure effective communication`**


###
<p align="center">
<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&duration=1&pause=1000&color=8EF720&width=435&lines=Architecture&center=true&vCenter=true" alt="Typing SVG" /></a></p>


<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=200&duration=1&pause=1000&color=BFF71B&width=235&lines=Class+Diagram%3A" alt="Typing SVG" /></a>

![image](https://github.com/user-attachments/assets/49c05cc2-e3ad-4549-ab31-42cb4bbf16cc)


<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=200&duration=1&pause=1000&color=BFF71B&width=435&lines=ERD" alt="Typing SVG" /></a>

![image](https://github.com/user-attachments/assets/567d682c-2810-44c0-8217-d00d9b49a1e8)


<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=200&duration=1&pause=1000&color=BFF71B&width=435&lines=Sequence+Diagram" alt="Typing SVG" /></a>

![image](https://github.com/user-attachments/assets/1aa4358b-df3e-46ce-b1c5-f08b8e1c434b)


###
<p align="center">
<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&duration=1&pause=1000&color=8EF720&width=435&lines=Elements&center=true&vCenter=true" alt="Typing SVG" /></a></p>


The Notification Entity, undoubtedly the pivotal and most crucial element of the system, is directly linked to all the other main entities. It houses the essential information concerning the managed notifications, as well as data from other entities necessary for the efficient creation and distribution of these notifications through a structured process, ensuring successful delivery to the targeted recipients.<br><br>

The content of each notification is generated from the available Templates, with each notification being associated with a specific Type that has multiple corresponding templates. Depending on the type selected during the creation of the notification, its content will adopt the structure of one of the templates belonging to the chosen type. Initially, these selected templates contain parameters and placeholders instead of actual values, which will be dynamically filled in by the user when creating the notification.<br><br>

A User in our system is represented by their basic contact information, such as their email address for email notifications or their phone number for SMS or phone call notifications. Another property of the User Entity is the Sector, which corresponds to the organization they belong to.<br><br>

The Audience of the notifications varies depending on the requirements. We can create a notification with one or more recipients. To facilitate targeting, system users can assign entire sectors to their notifications if needed, and can also specify individual recipients. Since the recipients of our notifications are lists of Users, the same applies to sectors.<br><br>

A Delivery is a set of notifications intended to be sent simultaneously. Each instance of this object has three date attributes:<br>

Creation Date: the date the delivery was created.<br>
Send Date: the date when the delivery was actually sent.<br>
Estimated Send Date: the planned date for sending the delivery. Once an estimated send date is set, the status of the notification automatically changes from "no status" to "pending."<br>
This Delivery entity, essentially a collection of notification objects, has specifications such as a name and the channel through which it will be sent to its recipients. This channel is referred to as the Delivery Method. There are several delivery methods: we can send notifications to our recipients via email, SMS, or postal mail.<br><br>

In summary, this notification system is based on an architecture of closely linked entities, with the Notification entity at its core. This entity orchestrates the creation, customization, and delivery of notifications by leveraging information from related entities. Thanks to the flexibility of templates and the ability to target entire sectors or individual users, the system allows for targeted and efficient communication.<br><br>


###

<p align="center">
<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&duration=1&pause=1000&color=8EF720&width=435&lines=Simulation&center=true&vCenter=true" alt="Typing SVG" /></a></p>

Below are simulation videos showcasing the key features of the app. Each video demonstrates the use of various features, accompanied by a voice-over 🔇🔊 explanation.
<br><br>

<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=200&duration=1&pause=1000&color=BFF71B&width=435&lines=Display+of+Notifications" alt="Typing SVG" /></a>

Display of Notifications : <br><br>
Our app includes a page dedicated to displaying notifications in a table format, which contains all relevant details. <br>
For the notification content column, which is essentially the message's body to be sent to recipients, only the first few words are visible. When the user hovers over the content column, a tooltip appears, showing the full message.<br><br>
Notifications that have been sent will display a delivery date, while those scheduled for future dispatch will show an estimated delivery date. <br><br>
Additionally, each notification is linked to a specific delivery. If a notification doesn't belong to any delivery, an icon will indicate this.<br><br>
The last column of the table shows the notification's status. Clicking on it will redirect the user to the page where they can manage the delivery associated with that notification.<br><br>

https://github.com/user-attachments/assets/6ba37f9b-cc39-4a3a-b54e-73a92b05ea4a

<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=200&duration=1&pause=1000&color=BFF71B&width=435&lines=Creation+of+Notifications+" alt="Typing SVG" /></a>

Creation of Notifications :<br><br>
To create a notification, the first step is to select its type. Each type has a list of associated templates. Once a template is chosen, dynamic input fields will appear, allowing the user to enter relevant data, such as the meeting date, location, and other specifics. These inputs vary depending on the selected template.<br><br>
A notification can be created with just the type, template, and dynamic inputs. However, additional details can be added to complete the notification, such as specifying the recipients (targets). Users can also assign the notification to a particular delivery, if applicable.<br><br>

https://github.com/user-attachments/assets/0ebb5e04-71d5-499f-94c9-7e0d9ab2876d



<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=200&duration=1&pause=1000&color=BFF71B&width=435&lines=Send+of+Deliveries" alt="Typing SVG" /></a>

On this page, we can view general statistics related to the delivery containing the selected notification, such as its status (pending, sent, etc.), the delivery method (email, SMS, etc.), and the number of recipients. There is also a section for visualizing and managing the various notifications within the delivery.<br><br>
For each delivery, we can see a list of recipients and the message content. It is possible to send an individual notification from the delivery, but doing so will remove it from the current delivery and create a new one containing only that notification. <br><br>
Alternatively, the entire delivery can be sent, which includes all of its notifications.<br><br>

https://github.com/user-attachments/assets/1ead14c7-32f2-4180-bb54-a86d8d947012


<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=200&duration=1&pause=1000&color=BFF71B&width=435&lines=Homepage+and+Sectors" alt="Typing SVG" /></a>


https://github.com/user-attachments/assets/2f5da443-db0a-4dfb-9a94-6d3d91a1a89f



<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=200&duration=1&pause=1000&color=BFF71B&width=435&lines=Actors" alt="Typing SVG" /></a>

https://github.com/user-attachments/assets/24313f81-1ef3-4a5b-a1c4-5c448f7f4119



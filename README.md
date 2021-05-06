# QCFirst Website

## Contributors
* Bibi Hassan & Navsangeet Kaur
* We both splitted the pages in half. We came togther before the day of the due date of the deliverables and helped each other out, and also discusses the changes and updates that are needed and evalutae each others work.
* Bibi Hassan: Created the homepage, student homepage, and student search page. Did the CSS styling for those pages. For the backend deliverable 1, deployed the website, and fixed the media queries to make the tables repsonsive.
* Navsangeet kaur: Created log in pages for both professor and student, sign up page, professor homepage and add course page. Did the CSS styling for those pages. For backend deliverable 1, created the sign up, log in's post methods, and session.

## Features
 * Responsive Design for mobile, tablet, and desktop
 * Links to get more information about how to use the website 
 * Contact form is provided
 * Clear Navigation
 * Geographic information
 * Images

## Pupose of the Website
The website lets the students to view the classes that they are enrolled in and add more classes to their schedule.
It also lets the instructors view the classes that they are teaching, add more classes to their course management and they can also dealte the courses.

## HTML code for the QCFirst Website
  * The following link is where our website is published https://bhassan6621.github.io/qcfirst/src/view/Index.html
  * There are 8 pages in total in our website:
  * First is homepage where we have the logo and it contains the log in button for the students that redirects the students to the student homepage, log in button for the professors that redirects the professors to the professor homepage, sign up button that will let the professors as well as students to sign up for the account. It also contains the links to the IT help desk and other helpful links as well as contact submission.
  * Sign Up page let the students and the professors to create an account if they don't have one.
  * The log in page for students let the students access their account and the information. When the log in button is clicked the students will be redirected to the students homepage.
  * The student page contains the table with the classes that students are already enrolled in and the one of the column contains info button which will show a pop window with the description about the course. It also consists the sign out button which will log out the user and redirect to the log in, and has add course button available on the same page that redirects the students to the search class page.
  * The search class page has the input where students can input the course they want to search with it's respective semester and will show the information in the table of that specific searched course on the same page. The table also contains a column where the student can click the box of specic section to select course section and then click the enroll button to add class.
  * The other log page for professors contains log in button that redirects the professor to the professor homepage that only instructors can access when it's clicked.
  * The professor homepage contains the table with the classes that professors are already decided to teach and one of the column contains delete button which will delete the course and remove it from the table. It also consists the sign out button which will log out the user and redirect to the log in, and has add course button available on the same page that redirects the professors to the add course page.
  * The add course page has the inputs where professor can input the course info that they want to show up on the student's search window search, and after entering the whole information they can click the add button and that course will show up on the professor courses teaching table that is on the professor homepage as well as in the students search table. 

## CSS styling for the QCFirst Website

* We have created style.css where the css styling for all the pages are included. The id's and classes are unique and distinguished from each other so the styling can be easier to implemented and don't clash with each other.
* After implementing the html nd css documents, we see that the website and the visual of the website are quite similar, we tried to implement all the features and content to the website that we put on the visuals. The only difference we see on our homepage, we wanted to provide more information however during implementation it looked so clustered and we had to remove few things in order to highlight the features. 

## Backend

* We have worked on the user management functionalities. 
* We created the database that has users, and sessions models. 
* The users models has all the information that the user put in the sign up form to register for the account, both instructor and student sign up information is in the same model. Then, the log in form match the provided email and password with the stored information and let the user log in or alert them if it fails. 
* The sessions model contains the cookies, session id, and expired date and time information. This model is populated when the user logs in the account.
* This is the live link to our replit: https://qcfirst-1.navsangeet.repl.co
* This is the join link for our replit: https://replit.com/join/ymgjogqb-navsangeet
* The link to our package.json: https://github.com/bhassan6621/qcfirst/blob/main/package.json
* The link to our main server.js: https://github.com/bhassan6621/qcfirst/blob/main/src/server.js


## Visuals of the QCFirst Website

The three visuals of website on desktop, tablet, and mobile respectively:
These UI's can also be found here: https://github.com/bhassan6621/qcfirst/tree/main/QCFirst_UI-UX

#### Desktop Version
<table>
  <tr>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Desktop/Homepage.png" height="500" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Desktop/SigninPage.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Desktop/SignupPage.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Desktop/StudentHomepage.png" height="400" width="200"> </td>
  </tr>
  <tr>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Desktop/SearchClass.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Desktop/PopupCourseDetails.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Desktop/TeacherHomepage.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Desktop/AddCoursePage.png" height="400" width="200"> </td>
  </tr>
</table>

#### Tablet Version
<table>
  <tr>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Tablet/Homepage.png" height="500" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Tablet/SigninPage.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Tablet/SignupPage.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Tablet/StudentHomepage.png" height="400" width="200"> </td>
  </tr>
  <tr>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Tablet/SearchClasses.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Tablet/classInfoPopUpScreen.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Tablet/TeacherHomepage.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/Tablet/TeacherAddCoursePage.png" height="400" width="200"> </td>
  </tr>
</table>

#### Mobile Version
<table>
  <tr>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/mobile/QC%20first%20Home%20page.png" height="500" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/mobile/Sign%20Up%20page.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/mobile/log%20In%20page.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/mobile/Student%20homepage.png" height="400" width="200"> </td>
  </tr>
  <tr>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/mobile/Enrollemnt%20page-2.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/mobile/Course%20info%20pop%20screen.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/mobile/Professor%20Homepage.png" height="400" width="200"> </td>
    <td> <img src="https://github.com/bhassan6621/qcfirst/blob/main/QCFirst_UI-UX/mobile/Add%20course.png" height="400" width="200"> </td>
  </tr>
</table>



* We have qcFirst Homepage
* Sign up page to sign up for the account
* Log in page 
* Student homepage that is visible to teh student in a certain format
* Enrollment page where students can search for classes as well a table with the different sections of seached course appears
* Info page pops up when a student clicks on info that is in the enrollment table while choosing classes and also included in the table that students are already enrolled in 
* Professor homepage that is visible to professor with different format and features
* Add courses page is where an instructor can add courses for students to view




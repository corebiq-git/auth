# CoreBIQ Fly — Firebase setup

This package adds the authentication/security foundation to the existing CoreBIQ Fly UI.

## 1. Create Firebase project
1. Open Firebase Console.
2. Create a project for CoreBIQ Fly.
3. Add a Web app.
4. Copy the Web SDK configuration into `firebase/firebase-config.js`.

## 2. Enable Authentication
Firebase Console → Authentication → Sign-in method → Email/Password → Enable.

## 3. Create Firestore
Create Cloud Firestore in Production/Locked mode. Deploy `firebase/firestore.rules` before using real data.

## 4. First Admin
Do NOT allow public sign-up to self-assign the admin role.
Create the first user in Firebase Authentication, copy that user's UID, then create:

`users/{UID}`

with fields:
- displayName
- email
- role: `admin`
- status: `active`
- companyId: your company ID
- department: `management`
- createdAt

After that, the Admin area can create staff records.

## 5. Hosting
Firebase Authentication for the web application should be tested/deployed from an authorized web origin such as Firebase Hosting. Opening an HTML file directly from `content://downloads` is not the production authentication environment.

Typical commands after installing Firebase CLI:

`firebase login`
`firebase init hosting firestore storage`
`firebase deploy`

## 6. Staff roles
Recommended roles:
- admin
- manager
- sales
- operations
- finance
- visa
- staff

The UI can hide modules based on role, but Firestore Security Rules are the actual security boundary.

## 7. Collections
CoreBIQ Fly is designed around:
- companies
- users
- customers
- leads
- enquiries
- packages
- itineraries
- quotations
- bookings
- services
- suppliers
- agents
- visa_cases
- umrah_cases
- invoices
- payments
- documents
- tasks
- notifications
- audit_logs

Every business record should carry `companyId` for tenant isolation.

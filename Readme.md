User (base auth info)
 ├── role: CLIENT or FREELANCER
 ├── [1:1] Client
 └── [1:1] Freelancer

Client
 └── [1:M] Job

Freelancer
 └── [1:M] Application

Job
 ├── [M:1] Client
 ├── [1:M] Application
 └── [1:1] Project

Application
 ├── [M:1] Job
 ├── [M:1] Freelancer
 └── [1:1] Project

 Project
 ├── [1:1] Job
 └── [1:1] Application

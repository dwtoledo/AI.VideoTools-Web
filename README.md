# Ai.VideoTools frontend using React with TypeScript
Ai.VideoTools is an application that uses Artificial Intelligence (AI) to generate title and description suggestions for videos. It analyzes the spoken content of the uploaded video to provide accurate suggestions.

How does it work?
 1. The user uploads an MP4 video and adds some keywords;
 2. The application uses OpenAI's AI to convert the speech from the video into written text;
 3. The user selects whether they want to generate title suggestions or descriptions;
 4. The user selects the level of creativity of the AI;
 5. The user can customize the requests to generate results that are closer to their reality;
 6. The results are shown on the screen once the user clicks on the "Generate" button.

## The frontend
 - The technology chosen for the project was React with TypeScript, utilizing the Vite framework;
 -  The Lucide React library was used to insert icons into the application;
 - Components from the shadcn/ui library were used in combination with TailwindCSS;
 - The Axios library was utilized to integrate REST APIs and communicate with the backend.

## Layout:
![Imagem](https://github.com/dwtoledo/upload-ai-web/assets/11148858/3f1dd50e-6630-4920-a6ea-ad07d03078fa)

## Where is the backend?
Ai.VideoTools Api repository:
https://github.com/dwtoledo/ai-video-tools-api

## Run locally:

**IMPORTANT:** Run locally the backend before the frontend.
Please follow the instructions provided on backend repository.

 1. *After run the backend...*
 2. Clone this repository;
 3. Go to ai-video-tools-web/src/lib/axios.ts and ensure the Axios baseURL is the same of backend:
    
    ```javascript
    import axios from 'axios'
    export const api = axios.create({
      baseURL: 'http://localhost:3333',
    })
    ```
 4. Open the project folder (ai-video-tools-web) in a terminal and install the necessary dependencies by using the following command:
	```console
	npm install
	```
 5. Run the project with the command:
	```console
	npm run dev
	```
 6. Open "http://localhost:5173/" on browser to start using the project.

## Contact:
Feel free to contact me in case of questions: dwtoledo@outlook.com

## Contributing:
Contributions are welcome! Please keep me in touch in case of improvements or fixes.

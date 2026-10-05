# NWSE Student Application: clickable prototype

Front-end-only prototype for approving layout and workflow. There is no backend, no database and no real sign-in. **Demo data only. Never enter real student information.**

## Run it locally

Requires Node 20.19 or newer (22 recommended).

```bash
npm install
npm run dev
```

Other scripts: `npm test` (logic tests), `npm run build` (type check, then build to `dist/`), `npm run preview` (serve the build).

## Deploy (AWS Amplify Hosting)

`amplify.yml` holds the build settings. Connect the GitHub repository in the Amplify console and it builds on every push. The app uses hash URLs (`/#/section/3`), so no rewrite rules are needed. To keep the demo private, turn on **Access control** (password protection) for the branch in the Amplify console.

## How it is put together

- `src/sections/*`: one folder per section. `schema.ts` holds its fields, labels and validation; the `*Section.tsx` file holds its screen.
- `src/services/*`: the three swap points for the real build. Screens never touch storage directly.
  - `AuthService`: demo student "Emma Thompson". Later: AWS Cognito.
  - `ApplicationRepository`: browser localStorage. Later: API Gateway and Lambda, with a server-side check that the student owns the record.
  - `DocumentService`: checks and resizes photos in the browser and keeps them on this device (IndexedDB). Later: server-side processing, malware scanning, private S3.
- `src/domain/status.ts`: status rules (Not started, In progress, Waiting on others, Submitted).
- `src/content/strings.ts` and `src/content/options.ts`: shared copy and dropdown lists, kept together for easy editing and translation later.
- **Demo controls** (tab on the right edge; end of page on phones): mark the doctor, teacher and parent responses, lock a section as if staff started review, and reset the demo.

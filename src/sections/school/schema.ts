import { z } from 'zod';
import type { UploadedDocument } from '../../domain/types';
import { documentIssue, issuesFor, requiredChoice, requiredText, type Validator } from '../../forms/validation';

export interface SchoolValues {
  schoolName: string;
  schoolLocation: string;
  gradeLevel: string;
  graduationYear: string;
  englishProficiency: string;
  testName: string;
  testScore: string;
  transcript: UploadedDocument | null;
  englishResults: UploadedDocument | null;
}

export const schoolLabels = {
  schoolCard: 'Current school',
  schoolName: 'Current school name',
  schoolLocation: 'School city and country',
  schoolLocationHint: 'For example: Lyon, France',
  gradeLevel: 'Current grade level',
  graduationYear: 'Expected graduation year',
  englishCard: 'English',
  englishProficiency: 'English proficiency',
  testName: 'Test name',
  testScore: 'Score',
  testScoreHint: 'Enter your overall score as it appears on your results.',
  documentsCard: 'Documents',
  documentsIntro: 'Clear photos work well. Make sure every word is easy to read.',
  transcript: 'Transcript',
  transcriptHint: 'Your grades from the last two school years. You can add several pages.',
  englishResults: 'English test results',
  englishResultsHint: 'A photo or PDF of your official score report.',
} as const;

export const schoolDefaults: SchoolValues = {
  schoolName: '',
  schoolLocation: '',
  gradeLevel: '',
  graduationYear: '',
  englishProficiency: '',
  testName: '',
  testScore: '',
  transcript: null,
  englishResults: null,
};

export const validateSchool: Validator<SchoolValues> = (values) => {
  const tookTest = values.englishProficiency === 'test';
  const schema = z.object({
    schoolName: requiredText('Enter the name of your school.'),
    schoolLocation: requiredText('Enter the city and country of your school.'),
    gradeLevel: requiredChoice('Choose your grade level.'),
    graduationYear: requiredChoice('Choose the year you expect to graduate.'),
    englishProficiency: requiredChoice('Choose how you will show your English level.'),
    testName: tookTest ? requiredChoice('Choose the test you took.') : z.string(),
    testScore: tookTest ? requiredText('Enter your test score.') : z.string(),
  });
  return [
    ...issuesFor(schema, values),
    ...documentIssue(values.transcript, 'transcript', 'Add your transcript.'),
    ...(tookTest ? documentIssue(values.englishResults, 'englishResults', 'Add your English test results.') : []),
  ];
};

export const schoolModule = { defaults: schoolDefaults, validate: validateSchool };

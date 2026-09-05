import type { ProcessStep, FailureMode } from './types';

/**
 * The four steps, taken from BasuGrow's own posts. This genuinely is a
 * sequence, which is why it is numbered — most "our process" sections are not.
 */
export const processSteps: ProcessStep[] = [
  {
    n: 1,
    title: 'People see your ad',
    body: 'Your offer runs in front of people near you who fit the customer you actually want — not everyone in the city, and not your existing followers.',
  },
  {
    n: 2,
    title: 'They fill the form',
    body: 'A short form asks only what you need to qualify them. Two or three questions is the sweet spot; ten is a way to get no answers at all.',
  },
  {
    n: 3,
    title: 'The lead hits your WhatsApp',
    body: 'Name, number and answers arrive on your phone within seconds, and an automatic first message goes to them confirming what happens next.',
  },
  {
    n: 4,
    title: 'You call and close',
    body: 'You do what you are good at. We watch how fast leads get answered and what they cost, and change the campaign around what actually converts.',
  },
];

/**
 * The four ways local ad budgets are usually wasted. Each pairs the mistake
 * with the thing that replaces it — vague complaints are not useful to a
 * business owner who is already sceptical.
 */
export const failureModes: FailureMode[] = [
  {
    wrong: 'You boost posts instead of running campaigns',
    right:
      'Boosting optimises for likes and reach because that is what the button is for. A lead campaign in Ads Manager optimises for people who fill in the form. Same money, different objective, completely different outcome.',
  },
  {
    wrong: 'The ad reaches the wrong people',
    right:
      'A gym advertising to a whole city pays to reach people who will never drive that far. Tight radius targeting, plus audiences built from your own customer list, put the budget in front of people who can actually buy.',
  },
  {
    wrong: 'The creative looks like an advert',
    right:
      'People scroll past anything that announces itself. Footage of your actual space and staff, with the hook in the first second, earns the stop that a polished graphic does not.',
  },
  {
    wrong: 'Nobody calls back in the first ten minutes',
    right:
      'An enquiry is worth a fraction of what it was as soon as it goes cold, and by evening someone else has called them. Instant WhatsApp delivery and an automatic first reply keep the conversation alive until you are free.',
  },
];

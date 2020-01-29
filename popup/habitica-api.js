/**
 * @typedef {Object} HabiticaCredentials
 * @property {string} apiKey
 * @property {string} userId
 */

/**
 * @typedef {Object} HabiticaInternalTask
 * @property {string} text
 * @property {string} notes
 * @property {string[]} checklist
 */

const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

/**
 * @param {HabiticaCredentials} credentials
 * @returns {function(*=): Promise<Response>}
 */
const createTaskOnHabitica = credentials => task => {
  return fetch('https://habitica.com/api/v3/tasks/user', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Api-Key': credentials.apiKey,
      'X-Api-User': credentials.userId,
    },
    body: JSON.stringify(task),
  });
};

const makeChecklistItem = text => ({
  text,
  id: guid(),
  completed: false
});

const makeTaskItem = ({ text, notes, checklist, type = 'todo' }) => ({
  type,
  text,
  notes,
  checklist,
  collapseChecklist: true,
});



/**
 * @param {HabiticaCredentials} credentials
 * @param {HabiticaInternalTask} task
 * @returns {Promise<Response>}
 */
export const startImport = async (credentials, task) => {
  const createTaskForUser = createTaskOnHabitica(credentials);
  const preparedTask = makeTaskItem({
    text: task.text,
    notes: task.notes,
    checklist: task.checklist.map(makeChecklistItem),
  });
  return createTaskForUser(preparedTask);
};

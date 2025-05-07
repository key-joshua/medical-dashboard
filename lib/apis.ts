export const APIsRequest = {
	getPatients: async () => {
        const username = 'coalition';
        const password = 'skills-test';
        const session = btoa(`${username}:${password}`); 
        const headers = { Authorization: `Basic ${session}`, 'Content-Type': 'application/json' };
		return await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', { method: 'GET', headers });
	},
};

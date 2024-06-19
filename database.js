const dbs = {
    db1: async (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (id > 10 || id < 1) reject('Invalid ID');
                resolve({
                    username: `user${id}`,
                    website: `www.user${id}.com`,
                    company: {
                        name: `Company ${id}`,
                        catchPhrase: `CatchPhrase ${id}`,
                        bs: `BS ${id}`
                    }
                });
            }, 100);
        });
    },
    db2: async (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (id > 10 || id < 1) reject('Invalid ID');
                resolve({
                    username: `user${id}`,
                    website: `www.user${id}.com`,
                    company: {
                        name: `Company ${id}`,
                        catchPhrase: `CatchPhrase ${id}`,
                        bs: `BS ${id}`
                    }
                });
            }, 100);
        });
    },
    db3: async (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (id > 10 || id < 1) reject('Invalid ID');
                resolve({
                    username: `user${id}`,
                    website: `www.user${id}.com`,
                    company: {
                        name: `Company ${id}`,
                        catchPhrase: `CatchPhrase ${id}`,
                        bs: `BS ${id}`
                    }
                });
            }, 100);
        });
    },
};

const central = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (id <= 3) resolve('db1');
            else if (id <= 6) resolve('db2');
            else if (id <= 10) resolve('db3');
            else resolve(null);
        }, 100);
    });
};

const vault = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (id > 10 || id < 1) reject('Invalid ID');
            resolve({
                name: `User ${id}`,
                email: `user${id}@example.com`,
                address: {
                    street: `Street ${id}`,
                    suite: `Suite ${id}`,
                    city: `City ${id}`,
                    zipcode: `Zipcode ${id}`,
                    geo: {
                        lat: `${id}.000`,
                        lng: `${id}.000`
                    }
                },
                phone: `Phone ${id}`
            });
        }, 100);
    });
};

const getUserData = async (id) => {
    if (typeof id !== 'number' || id < 1 || id > 10) {
        return Promise.reject('Invalid ID');
    }
    try {
        const dbName = await central(id);
        if (!dbName || !dbs[dbName]) {
            return Promise.reject('Invalid database');
        }
        const [basicInfo, personalInfo] = await Promise.all([dbs[dbName](id), vault(id)]);
        return {
            id: id,
            name: personalInfo.name,
            username: basicInfo.username,
            email: personalInfo.email,
            address: personalInfo.address,
            phone: personalInfo.phone,
            website: basicInfo.website,
            company: basicInfo.company
        };
    } catch (error) {
        return Promise.reject(error);
    }
};

(async () => {
    try {
        console.log(await getUserData(1)); // Should return valid user data
        console.log(await getUserData(11)); // Should reject with 'Invalid ID'
    } catch (error) {
        console.error(error);
    }
})();

const {superTest, expect} = require('../src/config/config')

describe('GET /crypto/pairs', () => {

    context('All pair saved', () => {
        it('Return all the pair added', async () => {
            const res = await superTest.get('/crypto/pairs');

            expect(res.status, 'Status OK').to.equals(200);

            expect(res.body.ok, 'Getting keys').to.eql(true);

        })
    })
});

describe('GET /crypto/average', () => {

    context('Pair by Symbol', () => {
        it('Return only one Pair from DB by Symbol', async () => {
            const res = await superTest.get('/crypto/average')
                .query({symbol: 'ETHUSDT'});
            expect(res.status, 'Status OK').to.equals(200);
        })
    });

    context('With non-QueryString', () => {
        it('Expected error to find a pair ', async () => {
            const res = await superTest.get('/crypto/average');

            expect(res.status, 'Status KO').to.equals(401);

            expect(res.body.ok, 'Getting keys').to.eql(false);
            expect(res.body.error, 'Error message').to.eql('Invalid symbol, try to add or get another one pair');
        });
    })
});

describe('POST /crypto/pairs', () => {

    context('Add new Pair', () => {
        it('Save new pair into DB', async () => {
            const res = await superTest.post('/crypto/pairs')
                .send({
                    symbol: 'SLPUSDT'
                });

            expect(res.status, 'Status OK').to.eql(200);
            expect(res.body.message, 'Succesfully message').to.eql('Pair SLPUSDT created successfully');
        })
    });

    context('BAD body request', () => {
        it('Error to save a wrong Pair', async () => {
            const res = await superTest.post('/crypto/pairs')
                .send({
                    symbol: 'SLPU'
                });

            expect(res.status, 'Status KO').to.eql(400);
            expect(res.body.ok, 'Getting ok status false').to.eql(false);
            expect(res.body.error, 'Fail message').to.eql('Invalid symbol.');
        })
    });

    context('Empty Body', () => {
        it('Error when the request body is empty', async () => {
            const res = await superTest.post('/crypto/pairs')
                .send({
                    symbol: ''
                });

            expect(res.status, 'Status KO').to.eql(400);
            expect(res.body.ok, 'Getting ok status false').to.eql(false);
            expect(res.body.error, 'Fail message').to.eql('Parameter \'symbol\' was empty.');
        })
    })
})
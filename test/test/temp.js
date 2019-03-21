const expect = require('chai').expect

describe('测试是否调用成功', () => {
    it('单个用例试验', () => {
        expect('lalal').to.be.an('string')
    })
})
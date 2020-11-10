var chai = require('chai');
let chaiHttp = require('chai-http');
let assert = require('assert');
let rooms = require('../src/utils/rooms');
let users = require('../src/utils/users');

let should = chai.should();
chai.use(chaiHttp);

//UNIT TESTS

describe("Unit Tests - Rooms", () => {

	it("should post a new room", async ()=> {
        rooms.roomsPost("python").then((new_room) => {
            assert.equal(new_room.data.args.name, "python");
        });
    })
    
    it("should get a room", async ()=> {
        rooms.roomsPost("java").then((new_room) => {
            rooms.roomGet(new_room.data.args.id).then((room)=> {
            assert.equal(new_room.id,room.id);
        })
        })
    })
    
    it("should get users in a room", async ()=> {
        rooms.roomsPost("ruby").then((new_room) => {
            users.getRoomUsers(new_room.data.args.id).then((all_rooms)=>{
                assert.equal(all_rooms[0].RoomId, new_room.data.args.id);
            })
        })
    })

})

//INTEGRATION TESTS

describe('Integration Test - Auth Register', () => {
    it('should return status code 200 for register user', (done) => {
        let new_user = {
            name: "username",
            password: "Hello1234.",
            email: "username@uc.cl"
        }
      chai.request('http://localhost:3000')
          .post('/auth/register')
          .send(new_user)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
})});

describe('Integration Test - User Login', () => {
    it('should return status code 200 for user login', (done) => {
        let user = {
            name: "username",
            password: "Hello1234."
        }
        chai.request('http://localhost:3000')
          .post('/auth/login')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
          });
          done()
})});



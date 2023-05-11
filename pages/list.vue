<template>
  <h1>LIST PAGE {{ name }}</h1>
  <hr>
  <button ref="listBtn" @click="listStudent">
    LIST STUDENT
  </button>
  <button @click="addStudent">
    ADD STUDENT
  </button>
  <table border="1">
    <thead>
      <tr>
        <th>No.</th>
        <th>ID</th>
        <th>Code</th>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(student, idx) in students" :key="student.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ student.id }}</td>
        <td>{{ student.code }}</td>
        <td>{{ student.fullname.toUpperCase() }}</td>
        <td>
          <button @click="editStudent(student)">
            EDIT
          </button>
          <button @click="delStudent(student)">
            DEL
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    let students = []
    // for (let i = 1; i <= 10; i++) {
    //   students.push({
    //     id: 100 + i,
    //     code: String(i).padStart(4, '0'),
    //     fullname: `Name ${i}`,
    //     dept: 'IT',
    //   })
    // }

    let items = {
      aaa: '0001',
      bbb: '0002',
      ccc: '0003',
    }

    return {
      students,
      items,
    }
  },

  computed: {
    lock() {
      console.log('xxxxxxxxxxxxxxxxxxxxxx')
      return this.name.length < 10
    },
    vat() {
      return this.age * this.name.length * (this.lock ? 10 : 20)
    },
  },

  async mounted() {
    console.log('mounted')
    await this.listStudent()

    // this.$refs.listBtn.focus()
  },

  methods: {
    async listStudent() {
      try {
        let result = await axios.get('/api/students')
        this.students = result.data.students ?? []
      } catch (e) {
        console.log('error', e)
      }
    }, // listStudent
    addStudent() {
      let id = 100 + this.students.length + 1
      this.students.push({
        id,
        code: String(id).padStart(4, '0'),
        name: `Name ${id}`,
      })
    },
    editStudent(std) {
      // this.$router.push('/edit/' + std.id)
      this.$router.push(`/student/${std.code}`)
      // this.$router.push({ to: `/edit/${std.id}`})
    },
    delStudent(std) {
      console.log(std) // { code: '0006' }
      let idx = this.students.findIndex(s => s.id === std.id)
      this.students.splice(idx, 1)
      // ['aaa', 'bbb', 'ccc']
      // 0       1     2
      //  0     1      2     3
      // .splice(1, 1) // ['aaa', 'ccc']
      // .splice(0, 2) // ['ccc']
      // .splice(2, 2) // ['aaa', 'bbb']
      // .splice(1, 1, 'xxx', 'yyy') // ['aaa', 'xxx', 'yyy', 'ccc']
      // .splice(1, 0, 'xxx', 'yyy') // ['aaa', 'xxx', 'yyy', 'bbb', 'ccc']
    },
  },
}
</script>

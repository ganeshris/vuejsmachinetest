<template>
    <div id="app" class="container mt-5">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h2>Sequence Table</h2>
        <div>
          <button class="btn btn-primary mr-2" @click="showModal = true">Add</button>
          <button class="btn btn-success" @click="downloadXLS">Download XLS</button>
        </div>
      </div>
  
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Current No</th>
            <th scope="col">Name</th>
            <th scope="col">Prefix</th>
            <th scope="col">Seperator</th>
            <th scope="col">Sequence Size</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sequences" :key="index">
            <td>{{ item.current_no }}</td>
            <td>{{ item.sequence_name }}</td>
            <td>{{ item.prefix }}</td>
            <td>{{ item.seperator }}</td>
            <td>{{ item.sequence_size }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal -->
      <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add New Sequence</h5>
              <button type="button" class="close" @click="closeModal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addSequence">
                <div class="form-group">
                  <label for="current_no">Current No</label>
                  <input type="number" class="form-control" id="current_no" v-model="newSequence.current_no" required>
                </div>
                <div class="form-group">
                  <label for="sequence_name">Name</label>
                  <input type="text" class="form-control" id="sequence_name" v-model="newSequence.sequence_name" required>
                </div>
                <div class="form-group">
                  <label for="prefix">Prefix</label>
                  <input type="text" class="form-control" id="prefix" v-model="newSequence.prefix" required>
                </div>
                <div class="form-group">
                  <label for="seperator">Seperator</label>
                  <input type="text" class="form-control" id="seperator" v-model="newSequence.seperator" required>
                </div>
                <div class="form-group">
                  <label for="sequence_size">Sequence Size</label>
                  <input type="number" class="form-control" id="sequence_size" v-model="newSequence.sequence_size" required>
                </div>
                <button type="submit" class="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showModal" class="modal-backdrop fade show"></div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import * as XLSX from 'xlsx';
  
  export default {
    data() {
      return {
        sequences: [],
        showModal: false,
        newSequence: {
          current_no: '',
          sequence_name: '',
          prefix: '',
          seperator: '',
          sequence_size: ''
        }
      };
    },
    methods: {
      fetchSequences() {
        axios.get( `${import.meta.env.VITE_APP_API_URL}/sureserve/sequence/seq`)
          .then(response => {
            this.sequences = response.data;
          })
          .catch(error => {
            console.error("There was an error fetching the sequences!", error);
          });
      },
      closeModal() {
        this.showModal = false;
        this.resetForm();
      },
      resetForm() {
        this.newSequence = {
          current_no: '',
          sequence_name: '',
          prefix: '',
          seperator: '',
          sequence_size: ''
        };
      },
      addSequence() {
        // Here you would typically send a POST request to your API to add the new sequence
        // For now, we'll just add it to the local sequences array
        this.sequences.push({ ...this.newSequence });
        this.closeModal();
      },
      downloadXLS() {
        const ws = XLSX.utils.json_to_sheet(this.sequences.map(seq => ({
          "Current No": seq.current_no,
          "Name": seq.sequence_name,
          "Prefix": seq.prefix,
          "Seperator": seq.seperator,
          "Sequence Size": seq.sequence_size
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sequences");
        XLSX.writeFile(wb, "sequences.xlsx");
      }
    },
    mounted() {
      this.fetchSequences();
    }
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1040;
  }
  </style>
  
<template>
  <div class="container">
    <div class="input-section">
      <div class="grid-container">
        <h2>Ciphertext</h2>
        <div v-for="(row, rowIndex) in inputGrid" :key="rowIndex" class="grid-row">
          <div v-for="(cell, colIndex) in row" :key="colIndex" class="grid-cell">
            <input v-model="inputGrid[rowIndex][colIndex]" @input="validateInput(rowIndex, colIndex)">
          </div>
        </div>
      </div>

      <div class="grid-container">
        <h2>Key</h2>
        <div v-for="(row, rowIndex) in keyGrid" :key="rowIndex" class="grid-row">
          <div v-for="(cell, colIndex) in row" :key="colIndex" class="grid-cell">
            <input v-model="keyGrid[rowIndex][colIndex]" @input="validateKey(rowIndex, colIndex)">
          </div>
        </div>
      </div>
    </div>

    <button @click="decrypt" class="btn">Decrypt</button>

    <div class="grid-container">
      <h2>Plaintext</h2>
      <div v-for="(row, rowIndex) in transpose(outputGrid)" :key="rowIndex" class="grid-row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" class="grid-cell">
          {{ cell }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useGlobalStore } from '@/stores/store';

export default {
  data() {
    return {
      keyGrid: [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
      inputGrid: [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
      outputGrid: [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']]
    };
  },
  methods: {
    validateKey(rowIndex, colIndex) {
      let value = this.keyGrid[rowIndex][colIndex];
      value = value.toUpperCase();
      if (!/^[0-9A-F]{0,2}$/.test(value)) {
        this.keyGrid[rowIndex][colIndex] = "";
        window.alert('The values should be in hexadecimal format');
      }
    },
    validateInput(rowIndex, colIndex) {
      let value = this.inputGrid[rowIndex][colIndex];
      value = value.toUpperCase();
      if (!/^[0-9A-F]{0,2}$/.test(value)) {
        this.inputGrid[rowIndex][colIndex] = "";
        window.alert('The values should be in hexadecimal format');
      }
    },
    transpose(array) {
      return array[0].map((col, i) => array.map(row => row[i]));
    },
    decrypt() {
      // Converts the key and input grids to 4x4 matrices:
      const keyMatrix = this.keyGrid.map((_, colIndex) => this.keyGrid.map(row => row[colIndex].toUpperCase()));
      const encryptedMatrix = this.inputGrid.map((_, colIndex) => this.inputGrid.map(row => row[colIndex].toUpperCase()));

      // Ensures that the key and input matrices are non-empty before proceeding:
      if (keyMatrix.some(row => row.some(cell => cell === '')) || encryptedMatrix.some(row => row.some(cell => cell === ''))) {
        window.alert('All fields should be filled out before decryption');
        return;
      }

      // Key expansion
      const roundKeys = useGlobalStore().keyExpansion(keyMatrix);

      // Initial round
      let state = useGlobalStore().addRoundKey(encryptedMatrix, roundKeys.slice(40, 44));

      // Main rounds
      for (let round = 10; round > 1; round--) {
        state = useGlobalStore().invShiftRows(state);
        state = useGlobalStore().invSubBytes(state);
        state = useGlobalStore().addRoundKey(state, roundKeys.slice((round - 1) * 4, (round) * 4));
        state = useGlobalStore().invMixColumns(state);
      }

      // Final round
      state = useGlobalStore().invShiftRows(state);
      state = useGlobalStore().invSubBytes(state);
      state = useGlobalStore().addRoundKey(state, roundKeys.slice(0, 4));

      // Converts the decrypted result to a 4x4 grid
      const decryptedGrid = state.map(row => row.map(cell => cell.toLowerCase()));
      this.outputGrid = decryptedGrid;
    },
  },
};
</script>

<style scoped>
.input-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.grid-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
}

.grid-row {
  display: flex;
}

.grid-cell {
  width: 30px;
  height: 30px;
  margin: 2px;
  border: 1px solid #ccc;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}

input {
  width: 100%;
  text-align: center;
}

.btn {
  background-color: #ccc;
  font-weight: bold;
  color: #333;
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>

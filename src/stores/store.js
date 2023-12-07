import { defineStore } from 'pinia';

const Rcon = [
    ['01', '00', '00', '00'],
    ['02', '00', '00', '00'],
    ['04', '00', '00', '00'],
    ['08', '00', '00', '00'],
    ['10', '00', '00', '00'],
    ['20', '00', '00', '00'],
    ['40', '00', '00', '00'],
    ['80', '00', '00', '00'],
    ['1B', '00', '00', '00'],
    ['36', '00', '00', '00']
];
const invSbox = [
    ['52', '09', '6A', 'D5', '30', '36', 'A5', '38', 'BF', '40', 'A3', '9E', '81', 'F3', 'D7', 'FB'],
    ['7C', 'E3', '39', '82', '9B', '2F', 'FF', '87', '34', '8E', '43', '44', 'C4', 'DE', 'E9', 'CB'],
    ['54', '7B', '94', '32', 'A6', 'C2', '23', '3D', 'EE', '4C', '95', '0B', '42', 'FA', 'C3', '4E'],
    ['08', '2E', 'A1', '66', '28', 'D9', '24', 'B2', '76', '5B', 'A2', '49', '6D', '8B', 'D1', '25'],
    ['72', 'F8', 'F6', '64', '86', '68', '98', '16', 'D4', 'A4', '5C', 'CC', '5D', '65', 'B6', '92'],
    ['6C', '70', '48', '50', 'FD', 'ED', 'B9', 'DA', '5E', '15', '46', '57', 'A7', '8D', '9D', '84'],
    ['90', 'D8', 'AB', '00', '8C', 'BC', 'D3', '0A', 'F7', 'E4', '58', '05', 'B8', 'B3', '45', '06'],
    ['D0', '2C', '1E', '8F', 'CA', '3F', '0F', '02', 'C1', 'AF', 'BD', '03', '01', '13', '8A', '6B'],
    ['3A', '91', '11', '41', '4F', '67', 'DC', 'EA', '97', 'F2', 'CF', 'CE', 'F0', 'B4', 'E6', '73'],
    ['96', 'AC', '74', '22', 'E7', 'AD', '35', '85', 'E2', 'F9', '37', 'E8', '1C', '75', 'DF', '6E'],
    ['47', 'F1', '1A', '71', '1D', '29', 'C5', '89', '6F', 'B7', '62', '0E', 'AA', '18', 'BE', '1B'],
    ['FC', '56', '3E', '4B', 'C6', 'D2', '79', '20', '9A', 'DB', 'C0', 'FE', '78', 'CD', '5A', 'F4'],
    ['1F', 'DD', 'A8', '33', '88', '07', 'C7', '31', 'B1', '12', '10', '59', '27', '80', 'EC', '5F'],
    ['60', '51', '7F', 'A9', '19', 'B5', '4A', '0D', '2D', 'E5', '7A', '9F', '93', 'C9', '9C', 'EF'],
    ['A0', 'E0', '3B', '4D', 'AE', '2A', 'F5', 'B0', 'C8', 'EB', 'BB', '3C', '83', '53', '99', '61'],
    ['17', '2B', '04', '7E', 'BA', '77', 'D6', '26', 'E1', '69', '14', '63', '55', '21', '0C', '7D']
];
const Sbox = [
    ['63', '7C', '77', '7B', 'F2', '6B', '6F', 'C5', '30', '01', '67', '2B', 'FE', 'D7', 'AB', '76'],
    ['CA', '82', 'C9', '7D', 'FA', '59', '47', 'F0', 'AD', 'D4', 'A2', 'AF', '9C', 'A4', '72', 'C0'],
    ['B7', 'FD', '93', '26', '36', '3F', 'F7', 'CC', '34', 'A5', 'E5', 'F1', '71', 'D8', '31', '15'],
    ['04', 'C7', '23', 'C3', '18', '96', '05', '9A', '07', '12', '80', 'E2', 'EB', '27', 'B2', '75'],
    ['09', '83', '2C', '1A', '1B', '6E', '5A', 'A0', '52', '3B', 'D6', 'B3', '29', 'E3', '2F', '84'],
    ['53', 'D1', '00', 'ED', '20', 'FC', 'B1', '5B', '6A', 'CB', 'BE', '39', '4A', '4C', '58', 'CF'],
    ['D0', 'EF', 'AA', 'FB', '43', '4D', '33', '85', '45', 'F9', '02', '7F', '50', '3C', '9F', 'A8'],
    ['51', 'A3', '40', '8F', '92', '9D', '38', 'F5', 'BC', 'B6', 'DA', '21', '10', 'FF', 'F3', 'D2'],
    ['CD', '0C', '13', 'EC', '5F', '97', '44', '17', 'C4', 'A7', '7E', '3D', '64', '5D', '19', '73'],
    ['60', '81', '4F', 'DC', '22', '2A', '90', '88', '46', 'EE', 'B8', '14', 'DE', '5E', '0B', 'DB'],
    ['E0', '32', '3A', '0A', '49', '06', '24', '5C', 'C2', 'D3', 'AC', '62', '91', '95', 'E4', '79'],
    ['E7', 'C8', '37', '6D', '8D', 'D5', '4E', 'A9', '6C', '56', 'F4', 'EA', '65', '7A', 'AE', '08'],
    ['BA', '78', '25', '2E', '1C', 'A6', 'B4', 'C6', 'E8', 'DD', '74', '1F', '4B', 'BD', '8B', '8A'],
    ['70', '3E', 'B5', '66', '48', '03', 'F6', '0E', '61', '35', '57', 'B9', '86', 'C1', '1D', '9E'],
    ['E1', 'F8', '98', '11', '69', 'D9', '8E', '94', '9B', '1E', '87', 'E9', 'CE', '55', '28', 'DF'],
    ['8C', 'A1', '89', '0D', 'BF', 'E6', '42', '68', '41', '99', '2D', '0F', 'B0', '54', 'BB', '16']
];

const useGlobalStore = defineStore({
    id: 'global',
    actions: {
        keyExpansion(key) {
            const w = new Array(44);

            // Copy the input key to the first 4 words
            for (let i = 0; i < 4; i++) {
                w[i] = [
                    key[i][0],
                    key[i][1],
                    key[i][2],
                    key[i][3]
                ];
            }

            // Perform key expansion
            for (let i = 4; i < 44; i++) {
                let temp = w[i - 1];

                if (i % 4 === 0) {
                    temp = subWord(rotWord(temp));
                    temp = [xorBytes(temp[0], Rcon[(i / 4) - 1][0]), temp[1], temp[2], temp[3]];
                }
                w[i] = xorWords(w[i - 4], temp);
            }

            return w;
        },
        addRoundKey(state, roundKey) {
            const updatedState = state.map((row, rowIndex) => {
                return row.map((cell, colIndex) => {
                    const stateByte = parseInt(cell, 16);
                    const roundKeyByte = parseInt(roundKey[rowIndex][colIndex], 16);
                    const resultByte = (stateByte ^ roundKeyByte).toString(16).padStart(2, '0');
                    return resultByte;
                });
            });

            return updatedState;
        },
        subBytes(state) {
            const updatedState = state.map(row => {
                return row.map(cell => {
                    const value = parseInt(cell, 16);
                    const rowIdx = (value >> 4) & 0x0F;
                    const colIdx = value & 0x0F;
                    return Sbox[rowIdx][colIdx];
                });
            });

            return updatedState;
        },
        shiftRows(state) {
            const updatedState = state.map((row, rowIndex) => {
                return row.map((cell, colIndex) => {
                    return state[(colIndex + rowIndex) % 4][colIndex];
                });
            });

            return updatedState;
        },
        mixColumns(state) {
            const mixedState = [];

            for (let col = 0; col < 4; col++) {
                const mixedColumn = mixColumn(state[col].map(cell => parseInt(cell, 16)));
                mixedState[col] = mixedColumn.map(byte => byte.toString(16).padStart(2, '0').toUpperCase());
            }

            return mixedState;
        },
        invSubBytes(state) {
            const updatedState = state.map(row => {
                return row.map(cell => {
                    const value = parseInt(cell, 16);
                    const rowIdx = (value >> 4) & 0x0F;
                    const colIdx = value & 0x0F;
                    return invSbox[rowIdx][colIdx];
                });
            });

            return updatedState;
        },
        invShiftRows(state) {
            const shiftedState = state.map((row, rowIndex) => {
                return row.map((cell, colIndex) => {
                    const shift = (colIndex === 1) ? 3 : (colIndex === 2) ? 2 : (colIndex === 3) ? 1 : 0;
                    return state[(rowIndex + shift) % 4][colIndex];
                });
            });

            return shiftedState;
        },
        invMixColumns(state) {
            const mixedState = [];

            for (let col = 0; col < 4; col++) {
                const mixedColumn = mixColumnInverse(state[col].map(cell => parseInt(cell, 16)));
                mixedState[col] = mixedColumn.map(byte => byte.toString(16).padStart(2, '0').toUpperCase());
            }

            return mixedState;
        }
    }
});

function mixColumn(column) {
    const resultColumn = [];

    for (let row = 0; row < 4; row++) {
        const a = column[row];
        const b = column[(row + 1) % 4];
        const c = column[(row + 2) % 4];
        const d = column[(row + 3) % 4];

        const mixedByte = multiply2(a) ^ multiply3(b) ^ c ^ d;
        resultColumn.push(mixedByte);
    }

    return resultColumn;
}

function mixColumnInverse(column) {
    const resultColumn = [];

    for (let row = 0; row < 4; row++) {
        const a = column[row];
        const b = column[(row + 1) % 4];
        const c = column[(row + 2) % 4];
        const d = column[(row + 3) % 4];

        const mixedByte = multiply14(a) ^ multiply11(b) ^ multiply13(c) ^ multiply9(d);
        resultColumn.push(mixedByte);
    }

    return resultColumn;
}

function multiply14(byte) {
    return multiply2(multiply2(multiply2(byte))) ^ multiply2(multiply2(byte)) ^ multiply2(byte);
}

function multiply11(byte) {
    return multiply2(multiply2(multiply2(byte))) ^ multiply2(byte) ^ byte;
}

function multiply13(byte) {
    return byte ^ multiply2(multiply2(byte)) ^ multiply2(multiply2(multiply2(byte)));
}

function multiply9(byte) {
    return multiply2(multiply2(multiply2(byte))) ^ byte;
}

function multiply2(byte) {
    byte = (byte << 1) ^ ((byte & 0x80) ? 0x11B : 0x00);
    return byte;
}

function multiply3(byte) {
    return multiply2(byte) ^ byte;
}

function xorBytes(a, b) {
    const result = (parseInt(a, 16) ^ parseInt(b, 16)).toString(16).padStart(2, '0').toUpperCase();
    return result;
}

function subWord(word) {
    return word.map(byte => {
        return Sbox[parseInt(byte[0], 16)][parseInt(byte[1], 16)];
    });
}

function rotWord(word) {
    return [word[1], word[2], word[3], word[0]];
}

function xorWords(word1, word2) {
    const resultWord = [];
    for (let i = 0; i < 4; i++) {
        resultWord.push(xorBytes(word1[i], word2[i]));
    }
    return resultWord;
}

export { useGlobalStore };
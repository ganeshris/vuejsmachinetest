<template>
    <div class="container mx-auto mt-10 p-5">
      <h2 class="text-center text-2xl font-semibold mb-6">Form</h2>
      <div class="flex justify-center">
        <div class="w-full lg:w-2/3">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="flex flex-col space-y-2">
              <label for="username" class="font-medium">Username</label>
              <input
                type="text"
                id="username"
                v-model="formData.username"
                placeholder="Enter your Username"
                class="form-input"
                required
              />
            </div>
  
            <div class="flex flex-col space-y-2">
              <label for="email" class="font-medium">Email</label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                placeholder="Enter your Email"
                class="form-input"
                required
              />
            </div>
  
            <div class="flex flex-col space-y-2">
              <label for="password" class="font-medium">Password</label>
              <div class="flex">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="formData.password"
                  placeholder="Enter your password"
                  class="form-input flex-1"
                  required
                />
                <button type="button" @click="togglePasswordVisibility" class="btn-toggle ml-2">
                  {{ showPassword ? "Hide" : "Show" }}
                </button>
              </div>
            </div>
  
            <div class="flex flex-col space-y-2">
              <label for="phone" class="font-medium">Phone</label>
              <input
                type="tel"
                id="phone"
                v-model="formData.phone"
                placeholder="Enter your phone number"
                class="form-input"
              />
            </div>
  
            <div class="flex flex-col space-y-2">
              <label for="date" class="font-medium">Date</label>
              <input type="date" id="date" v-model="formData.date" class="form-input" />
            </div>
  
            <div class="flex flex-col space-y-2">
              <label for="datetime" class="font-medium">Date and Time</label>
              <input
                type="datetime-local"
                id="datetime"
                v-model="formData.datetime"
                class="form-input"
              />
            </div>
  
            <div class="flex flex-col space-y-2">
              <label for="number" class="font-medium">Number</label>
              <input type="number" id="number" v-model="formData.number" class="form-input" />
            </div>
  
            <div class="flex flex-col space-y-2">
              <label for="decimal" class="font-medium">Decimal</label>
              <input
                type="text"
                id="decimal"
                v-model="formData.decimal"
                placeholder="Enter any decimal number"
                pattern="\d+(\.\d*)?"
                title="Please enter a valid decimal number."
                class="form-input"
              />
            </div>
  
            <div class="flex flex-col space-y-2">
              <label for="url" class="font-medium">URL</label>
              <input
                type="url"
                id="url"
                v-model="formData.url"
                placeholder="Enter a URL"
                class="form-input"
                required
              />
            </div>
  
            <div class="flex flex-col space-y-2">
              <label for="selectOption" class="font-medium">Static Dropdown</label>
              <select id="selectOption" v-model="formData.selectOption" class="form-select">
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
  
            <div class="flex flex-col space-y-2">
              <label for="multiSelectOption" class="font-medium">Multi-Select Dropdown</label>
              <v-select
                id="multiSelectOption"
                :options="multiSelectOptions"
                v-model="formData.multiSelectOption"
                multiple
                class="basic-multi-select"
                classPrefix="select"
              ></v-select>
            </div>
  
            <div class="flex flex-col space-y-2">
              <label for="percentage" class="font-medium">Percentage</label>
              <input
                type="number"
                id="percentage"
                v-model="formData.percentage"
                placeholder="Enter a percentage"
                min="0"
                class="form-input"
              />
            </div>
  
            <div class="flex flex-col space-y-2">
              <label for="textarea" class="font-medium">Textarea</label>
              <textarea
                id="textarea"
                rows="3"
                v-model="formData.textarea"
                placeholder="Enter additional information"
                class="form-textarea"
              ></textarea>
            </div>
  
            <div class="flex flex-col space-y-2">
              <label class="font-medium">Radio Options</label>
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="radioOption"
                    id="option1"
                    value="Option 1"
                    v-model="formData.radioOption"
                  />
                  <label for="option1">Option 1</label>
                </div>
                <div class="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="radioOption"
                    id="option2"
                    value="Option 2"
                    v-model="formData.radioOption"
                  />
                  <label for="option2">Option 2</label>
                </div>
              </div>
            </div>
  
            <div class="flex items-center space-x-2">
              <input
                type="checkbox"
                id="toggleSwitch"
                v-model="formData.toggleSwitch"
                class="form-checkbox"
              />
              <label for="toggleSwitch">
                {{ formData.toggleSwitch ? "Disable Option" : "Enable Option" }}
              </label>
            </div>
  
            <div class="flex items-center space-x-2">
              <input
                type="checkbox"
                id="acceptTerms"
                v-model="formData.acceptTerms"
                class="form-checkbox"
              />
              <label for="acceptTerms">I accept the terms and conditions</label>
            </div>
  
            <re-captcha
              sitekey="6LdzvMwpAAAAAHt6h_aZ6dPpT_qp0K3OjNWsY1A9"
              @verify="onCaptchaChange"
            />
  
            <div class="mt-4">
              <button type="submit" class="btn btn-secondary w-full">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import VSelect from 'vue-select';
  import ReCaptcha from 'vue-recaptcha';
  
  export default {
    name: 'DataType1',
    components: {
      VSelect,
      ReCaptcha,
    },
    setup() {
      const formData = ref({
        username: '',
        email: '',
        password: '',
        phone: '',
        date: '',
        datetime: '',
        number: '',
        decimal: '',
        url: '',
        selectOption: '',
        multiSelectOption: [],
        percentage: '',
        textarea: '',
        radioOption: '',
        toggleSwitch: false,
        acceptTerms: false,
      });
  
      const showPassword = ref(false);
      const captchaVerified = ref(false);
  
      const multiSelectOptions = ref([
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ]);
  
      const onCaptchaChange = (value) => {
        console.log('Captcha value:', value);
        captchaVerified.value = true;
      };
  
      const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value;
      };
  
      const handleSubmit = () => {
        if (!captchaVerified.value) {
          alert('Please verify that you are not a robot.');
          return;
        }
        console.log('Form Data Submitted:', formData.value);
  
        let missingFields = [];
        Object.entries(formData.value).forEach(([key, value]) => {
          if (!value && key !== 'radioOption' && key !== 'toggleSwitch' && key !== 'acceptTerms') {
            missingFields.push(key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'));
          }
        });
        if (missingFields.length > 0) {
          alert(`Please fill out the following fields: ${missingFields.join(', ')}`);
        } else {
          alert('Form submitted successfully!');
        }
      };
  
      return {
        formData,
        showPassword,
        captchaVerified,
        multiSelectOptions,
        onCaptchaChange,
        togglePasswordVisibility,
        handleSubmit,
      };
    },
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  
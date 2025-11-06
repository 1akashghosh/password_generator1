import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&+-/';

    if (uppercase) characterList += uppercaseChars;
    if (lowercase) characterList += lowercaseChars;
    if (numbers) characterList += digitChars;
    if (symbols) characterList += specialChars;

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let index = 0; index < passwordLength; index++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setUppercase(false);
    setLowercase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
       initialValues={{ passwordLength:'' }}
       validationSchema={passwordSchema}
      onSubmit={values => {
        generatePasswordString(Number(values.passwordLength))
      }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
        <>
        <View style={styles.inputwraper}>
          <View style={styles.inputcolumn}>
            <Text style={styles.heading}>password length</Text>
            {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>
                {errors.passwordLength}
              </Text>
            )}
           
          </View>
          <TextInput
            style={styles.inputstyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder='Ex.8'
            keyboardType='numeric'
            />
        </View>
        <View style={styles.inputwraper}>
          <Text style={styles.heading}>Include lowercase</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={lowercase}
          onPress={()=>setLowercase(!lowercase)}
          fillColor='#29AB87'
          />
        </View>
        <View style={styles.inputwraper}>
        <View style={styles.inputwraper}>
          <Text style={styles.heading}>Include Uppercase </Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={uppercase}
          onPress={()=>setUppercase(!uppercase)}
          fillColor='#29AB87'
          />
        </View>
          
        </View>
        <View style={styles.inputwraper}>
        <View style={styles.inputwraper}>
          <Text style={styles.heading}>Include Numbers</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={numbers}
          onPress={()=>setNumbers(!numbers)}
          fillColor='#29AB87'
          />
        </View>
        </View>
        <View style={styles.inputwraper}>
        <View style={styles.inputwraper}>
          <Text style={styles.heading}>Include Symbols</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={symbols}
          onPress={()=>setSymbols(!symbols)}
          fillColor='#29AB87'
          />
        </View>
        </View>
        <View style={styles.formactions}>
          <TouchableOpacity
          disabled={!isValid}
          style={styles.primarybutton}
          onPress={handleSubmit}
          >
            <Text style={styles.primarybuttontxt}>Generated password</Text>
          </TouchableOpacity>
          <TouchableOpacity
           style={styles.seconderybutton}
           onPress={()=>{
            handleReset();
            resetPasswordState()
           }}
          >
            <Text style={styles.seconderybuttontxt}>Reset password</Text>
          </TouchableOpacity>
        </View>
        </>
       )}
         </Formik>
        </View>
        {isPassGenerated ?(
          <View style={[styles.card,styles.cardeleveted]}>
            <Text style={styles.subtitle}>result:</Text>
            <Text style={styles.description}>Long press to copy</Text>
            <Text selectable={true} style={styles.generatedpassword}>{password}</Text>
          </View>
        ):null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6', // soft gray background
  },
  formContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e293b',
    marginBottom: 20,
  },
  inputwraper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    gap:10,
    
  },
  inputcolumn: {
    flexDirection: 'column',
  },
  heading: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '500',
  },
  inputstyle: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#1e293b',
    marginTop: 5,
    width: 80,
    textAlign: 'center',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 13,
    marginTop: 4,
  },
  formactions: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  primarybutton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
    flex: 1,
    marginHorizontal: 5,
  },
  primarybuttontxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  seconderybutton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    flex: 1,
    marginHorizontal: 5,
  },
  seconderybuttontxt: {
    color: '#1e293b',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    marginVertical: 25,
    borderRadius: 16,
    padding: 20,
  },
  cardeleveted: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  subtitle: {
    color: '#93c5fd',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  description: {
    color: '#e2e8f0',
    fontSize: 14,
    marginBottom: 10,
  },
  generatedpassword: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginTop: 5,
  },
});


const validadorComum = {
  texto:{
    vazia: (val) =>{
      return typeof val !== 'string' || val.length < 1;
    }
  },
  numero:{
    ehNumbero:(val) =>{
      return !Number.isNaN(Number(val));
    }
  },
  funcao:{
    ehFuncao: (val)=> typeof val === 'function'
  }
};

const validadoresNull = val => Object.is(val,null) || Object.is(val, undefined);

const negative = val => !(val);

const Validador = {
  ...validadorComum,
  ehNullOuUndefined: validadoresNull,
  nao: (val)=>{
    let resp = {};
    Object.entries(validadorComum)
      .forEach((key,val)=>resp[key]=(obj)=>negative(val(obj)));
    resp.ehNullOuUndefined = obj => negative(validadoresNull(obj));
    return resp;
  }

};
export default Validador;


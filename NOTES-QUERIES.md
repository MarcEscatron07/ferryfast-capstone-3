# {
  # getRoles {
  #   id
  #   name
  #   administrators {
  #     username
  #   }
  # }
  
  # getStats {
  #   id
  #   name
  #   administrators {
  #     username
  #   }
  # }
  
  # getAdministrators {
  #   username
  #   firstname
  #   surname
  #   email
  #   password
  #   roleId
  #   statId
  #   role {
  #     name
  #   }
  #   stat {
  #     name
  #   }
  # }
# }

# mutation {
  # createRole(
  #   uniqueId: 1,
  #   name: "Staff"
  # ) {
  #   id
  #   name
  # }
  
  # updateRole(
  #   id: "5e3029d6eff8f40ea2b302ba"
  #   uniqueId: 2,
  #   name: "Temp"
  # ){
  #   id
  #   name
  # }
  
  # deleteRole(
  #   id: "5e3029d6eff8f40ea2b302ba"
  # ){
  #   id
  #   name
  # }
  
  # createStat(
  #   uniqueId: 1,
  #   name: "active"
  # ){
  #   id
  #   name
  # }
  
  # updateStat(
  #   id:"5e302a9deff8f40ea2b302bb"
  #   uniqueId: 2,
  #   name: "temp"
  # ){
  #   id
  #   name
  # }
  
  # deleteStat(
  #   id:"5e302a9deff8f40ea2b302bb"
  # ){
  #   id
  #   name
  # }
  
  # createAdministrator(
  #   username: "espegez",
  #   firstname: "Mariah Espe"
  #   surname: "Gesalan",
  #   email: "espegez28@gmail.com",
  #   password: "admin",
  #   roleId: "",
  #   statId: ""
  # ){
  #   id
  #   username
  # }
  
  # updateAdministrator(
  #   id: "5e302372341789a849470159",
  #   username: "exardiah",
  #   firstname: "Marc Benedict"
  #   surname: "Escatron",
  #   email: "marc.escatron07@gmail.com",
  #   password: "supadmin",
  #   roleId: "",
  #   statId: ""
  # ){
  #   id
  #   username
  # }
  
  # deleteAdministrator(id:"5e302372341789a849470159"){
  #   id
  #   username
  # }
# }
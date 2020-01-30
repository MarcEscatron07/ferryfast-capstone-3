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
  
  # getOrigins {
  #   id
  #   name
  #   destinations {
  #     name
  #   }
  # }
  # getDestinations {
  #   id
  #   name
  #   originId
  #   origin {
  #     name
  #   }
  # }
# }

# mutation {
  # createRole(
  #   name: "Staff"
  # ) {
  #   id
  #   name
  # }
  # updateRole(
  #   id: "5e3029d6eff8f40ea2b302ba"
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
  #   name: "new Stat"
  # ){
  #   id
  #   name
  # }
  # updateStat(
  #   id:"5e302a9deff8f40ea2b302bb"
  #   name: "Temp"
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
  # 	username
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
  
  # createOrigin(
  #   name: "Bohol"
  # ){
  # 	id
  #   name
  # }
  # updateOrigin(
  #   id: "5e328a1b01be4647046c6ff2",
  #   name: "Cebu"
  # ){
  #   id
  #   name
  # }
  # deleteOrigin(
  #   id: "5e328a1b01be4647046c6ff2"
  # ){
  #   id
  #   name
  # }
  # createDestination(
  #   name: "Dumaguete"
  #   originId: "5e328b2601be4647046c6ff3"
  # ){
  #   id
  #   name
  # }
  # updateDestination(
  #   id: "5e328bdce51587486a367d52"
  #   name: "Leyte"
  #   originId: "5e328b2601be4647046c6ff3"
  # ){
  #   id
  #   name
  # }
  # deleteDestination(
  #   id: "5e328bdce51587486a367d52"
  # ){
  #   id
  #   name
  # }
# }
// spread operator

const friends = ['Alice', 'Bob', 'Charlie'];
const schoolFriends = ['David', 'Eve'];
friends.push(...schoolFriends);


const userCurretAddress={
    street:'123 Main St',
    city:'New York',
    state:'NY'
};

const userFamilyAddress={
    motherName :'Lubana',
    fatherName:'Ahmed',
   
};
const userinfo={
    ...userCurretAddress,
    ...userFamilyAddress
};
// console.log(userinfo);

// rest operator


const sentInviationsToFriends =(...friends:string[])=>{
    friends.forEach((friend)=>{
        console.log(`Inviting ${friend} to the party`);
    });
}

sentInviationsToFriends('Alice', 'Bob', 'Charlie', 'David', 'Eve');
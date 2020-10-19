<?php
require('./u_connect.php');

//书写sql语句
$sql = "CREATE TABLE users (
			username VARCHAR(300) NOT NULL PRIMARY KEY,
			u_password VARCHAR(30) NOT NULL
)";
$result = mysqli_query($conn,$sql);
if($result){
	echo "数据表创建成功";
}else{
	echo "数据表创建失败";
}

?>
<?php
require('./u_connect.php');

//书写sql语句
$sql = "CREATE TABLE users (
			id VARCHAR(300) NOT NULL PRIMARY KEY,
			username VARCHAR(300) NOT NULL,
			u_password VARCHAR(30) NOT NULL
)";
$result = mysqli_query($conn,$sql);
if($result){
	echo "数据表创建成功";
}else{
	echo "数据表创建失败";
}

?>
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class loginModel extends CI_Model {

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
        $this->load->database();
    }
    
    public function logeo($arg1) {
        return $this->db->query("SELECT 
									usuarios.usuario,
									usuarios.id_nivel,
									usuarios.id_sucursal,
									usuarios.pass,
									sucursales.prefijo
								 FROM usuarios
                                    LEFT JOIN sucursales ON sucursales.id=usuarios.id_sucursal 
                                 WHERE 
								 	usuarios.usuario='".$this->db->escape_str($arg1)."'
									AND 
									usuarios.status=1 
								 LIMIT 1");
    }
    
    public function acceso($arg,$arg2) {
        //insertar a la base de datos
            $data_table = array(
                'usuario' => $arg,
                'ip' => $this->getRealIP(),
                'fecha' => date("Y-m-d"),
                'hora' => date('H:m:s'),
                'sucursal' => $arg2
             );
            $this->db->insert('accesos', $data_table);
    }
	
	public function permisos($arg1) {
        $query_result=$this->db->query("SELECT 
											id_submenu
										 FROM 
										 	niveles
		                                 WHERE 
										 	id=".$arg1."
										 LIMIT 1")->result();
		$cadena=str_replace("*","|",$query_result[0]->id_submenu);
		return explode("|", $cadena);
    }
    
    function getRealIP() {
        if (isset($_SERVER["HTTP_CLIENT_IP"]))
		{
			return $_SERVER["HTTP_CLIENT_IP"];
		}
		elseif (isset($_SERVER["HTTP_X_FORWARDED_FOR"]))
		{
			return $_SERVER["HTTP_X_FORWARDED_FOR"];
		}
		elseif (isset($_SERVER["HTTP_X_FORWARDED"]))
		{
			return $_SERVER["HTTP_X_FORWARDED"];
		}
		elseif (isset($_SERVER["HTTP_FORWARDED_FOR"]))
		{
			return $_SERVER["HTTP_FORWARDED_FOR"];
		}
		elseif (isset($_SERVER["HTTP_FORWARDED"]))
		{
			return $_SERVER["HTTP_FORWARDED"];
		}
		else
		{
			return $_SERVER["REMOTE_ADDR"];
		}
    }
    /*
    public function get_mysqli() { 
        $db = (array)get_instance()->db;
        return mysqli_connect('localhost', $db['username'], $db['password'], $db['database']);
    }
	*/
    function __destruct(){
        $this->db->close();
    }
}
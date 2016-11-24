<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class sistemaModel extends CI_Model {

    function __construct(){
        // Call the Model constructor
        parent::__construct();
        $this->load->database();
    }
    
    public function menu() {
        $rows_niv=$this->db->query("SELECT id_menu, id_submenu FROM niveles WHERE id=".$this->session->userdata('id_nivel')." LIMIT 1")->result();
        $row_idMenu=explode('|', $rows_niv[0]->id_menu);
        $row_idSub=explode('*', $rows_niv[0]->id_submenu);

        for($i=0;count($row_idMenu)>$i;$i++){
            $row_temp=$this->db->query("SELECT id, menu FROM menu WHERE id=".$row_idMenu[$i]." LIMIT 1")->result();
            $array_a_enviar[$i]=array("id"=>$row_temp[0]->id,"menu"=>$row_temp[0]->menu);
        }
        
       
   
        for($i=0;count($array_a_enviar)>$i;$i++){
            $cadena="";
            $completar=explode('|', $row_idSub[$i]);
            for($x=0;count($completar)>$x;$x++){
                //echo "x:".$x;
                //echo "<br>";
                if($x==0){
                    $cadena.="id=".$completar[$x];
                }else{
                    $cadena.=" OR id=".$completar[$x];
                }
            }
            
            $row_temp=$this->db->query("SELECT id_menu, submenu, clase FROM submenu WHERE id_menu=".$array_a_enviar[$i]["id"]." AND ".$cadena)->result();
            
            //var_dump($row_idSub[1]);
            //echo "<br><br>";
            
            
            foreach ($row_temp as $row){
                    $myArray[] = array("ID"=>$row->id_menu,"SUB"=>$row->submenu,"CLASE"=>$row->clase);
            }
            
            $array_final[$i]=array("id"=>$array_a_enviar[$i]["id"],"menu"=>$array_a_enviar[$i]["menu"],"submenu"=>$myArray);
            unset($myArray);
        }
        
        return $array_final;
        
    }
    
    public function perfil(){
        return $this->db->query("SELECT usuarios.nombre,usuarios.apellido,usuarios.foto,SHA1(usuarios.usuario) as secreto, CONCAT(niveles.nombre, ' - ',sucursales.sucursal ) as nivel
				FROM usuarios
					LEFT JOIN niveles ON usuarios.id_nivel=niveles.id
                                        LEFT JOIN sucursales ON usuarios.id_sucursal=sucursales.id
				WHERE usuarios.usuario='".$this->session->userdata('usuario')."' LIMIT 1")->result();
    }
    
    
    
    public function get_mysqli() { 
        $db = (array)get_instance()->db;
        return mysqli_connect('localhost', $db['username'], $db['password'], $db['database']);
    }
    
    function __destruct(){
        $this->db->close();
    }
}
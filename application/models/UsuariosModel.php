<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class usuariosModel extends CI_Model {

    function __construct(){
        // Call the Model constructor
        parent::__construct();
        $this->load->database();
    }
        
    public function niveles(){
        return $this->db->query("SELECT id,nombre FROM niveles")->result();
    }
    
    public function usuarios(){
        return $this->db->query("SELECT a.nombre, a.apellido, a.usuario, a.status, b.nombre as nivel, a.telefono, a.correo
								 FROM usuarios a
                                    LEFT JOIN niveles b ON a.id_nivel=b.id
                        	     WHERE a.usuario!='spank' AND a.status!=2")->result();
    }
    
    public function usuarioCompleto($arg){
        return $this->db->query("SELECT nombre,apellido,id_nivel,foto,telefono,correo,calle,colonia,estado,SHA1(usuario) as secreto, id_sucursal
							  FROM usuarios
							  WHERE usuario='".$arg."' LIMIT 1")->result();
    }
    
    public function insertarUsuario(){
        //revisar si existe el usuario
        $existe=$this->db->query("SELECT usuario FROM usuarios WHERE usuario='".$this->input->post("usuario")."' LIMIT 1")->result();
        if(count($existe)>=1){
            return "existe";
        }else{
            //crear carpeta
            $enc=sha1($this->input->post("usuario"));
            $carpeta='./static/imagenes/users/'.$enc.'/';

            if (!file_exists($carpeta)) {
                mkdir($carpeta, 0777, true);
            }
            
            
            
            //subir la foto
            $nombre_foto="";
            
            if(isset($_FILES['foto'])){
                $nombre_foto=$_FILES['foto']["name"];
                $config['upload_path']   = $carpeta; 
                $config['allowed_types'] = 'jpeg|jpg|png';
                $this->load->library('upload', $config);
                if ( ! $this->upload->do_upload('foto')){
                    return "imagen";
                }
            }
            
            //insertar a la base de datos
            $data_table = array(
                'usuario' => $this->input->post("usuario"),
                'pass' => sha1($this->input->post("pass")),
                'id_nivel' => $this->input->post("nivel"),
                'status' => 1,
                'correo' => $this->input->post("correo"),
                'nombre' => $this->input->post("nombre"),
                'apellido' => $this->input->post("apellido"),
                'calle' => $this->input->post("calle"),
                'colonia' => $this->input->post("colonia"),
                'estado' => $this->input->post("estado"),
                'telefono' => $this->input->post("telefono"),
                'id_sucursal' => $this->input->post("sucursal"),
                'foto' => $nombre_foto
             );
            $this->db->insert('usuarios', $data_table);
            return "true";
        }
        
    }
    
    public function modificarUsuario(){
        //subir la foto
        

        if(isset($_FILES['foto'])){
            $enc=sha1($this->input->post("usuario"));
            $carpeta='./static/imagenes/users/'.$enc.'/';
            
            //eliminar imagenes anteriores
            $files = glob($carpeta . '*');
            foreach ($files as $file) {
                    unlink($file);
            }
            
            $nombre_foto=$_FILES['foto']["name"];
            $config['upload_path']   = $carpeta; 
            $config['allowed_types'] = 'jpeg|jpg|png';
            $this->load->library('upload', $config);
            if ( ! $this->upload->do_upload('foto')){
                return "imagen";
            }
            $this->db->set('foto',$nombre_foto);
        }
        
        if($this->input->post("pass")){
            $this->db->set('pass',sha1($this->input->post("pass")));
        }        
        //actualizar registro
        $this->db->where('usuario', $this->input->post("usuario"));
        $this->db->set('id_nivel',$this->input->post("nivel"));
        $this->db->set('nombre',$this->input->post("nombre"));
        $this->db->set('apellido',$this->input->post("apellido"));
        
        $this->db->set('telefono',$this->input->post("telefono"));
        $this->db->set('correo',$this->input->post("correo"));
        $this->db->set('colonia',$this->input->post("colonia"));
        $this->db->set('estado',$this->input->post("estado"));
        $this->db->set('id_sucursal',$this->input->post("sucursal"));
        
        $this->db->update('usuarios');
        return "true";
    }

    public function bloquearUsuario() { 
        //insertar a la base de datos
        $valor=1;
        if($this->input->post("lock")==1){
            $valor=0;
        }
        
        $this->db->where('usuario', $this->input->post("usuario"));
        $data_table = array(
            'status' => $valor,
            'status_a' => $valor
         );
        $this->db->update('usuarios', $data_table);
        return "true";
    }
    
    public function eliminarUsuario() { 
        //eliminar de la base de datos
        $this->db->delete('usuarios', array('usuario' => $this->input->post("usuario"))); 
        return "true";
    }
    
    public function sucursales(){
        return $this->db->query("SELECT id,sucursal FROM sucursales")->result();
    }


    public function get_mysqli() { 
        $db = (array)get_instance()->db;
        return mysqli_connect('localhost', $db['username'], $db['password'], $db['database']);
    }
    
    function __destruct(){
        $this->db->close();
    }
}
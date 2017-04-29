<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class login extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
         
        function __construct(){
            // Call the Model constructor
            parent::__construct();
            $this->load->helper('url');
            $this->load->model('loginModel');
        }

        public function logeo(){
            $result=$this->loginModel->logeo($this->input->post("user"));
            
            if($result->num_rows()==1){
                $row = $result->result();
                
				if (crypt($this->input->post("pass"), $row[0]->pass) == $row[0]->pass){
					//libera de la memoria la consulta anterior
					$result->free_result();
					//obtener permisos
					$resultado=$this->loginModel->permisos($row[0]->id_nivel);
					$this->session->set_userdata("permisos",$resultado);
					//echo 'El usuario ha sido autenticado correctamente';
					$this->session->set_userdata("usuario",$row[0]->usuario);
					$this->session->set_userdata("id_nivel",$row[0]->id_nivel);
					$this->session->set_userdata("sucursal",$row[0]->id_sucursal);
					$this->session->set_userdata("prefijo",$row[0]->prefijo);
					//registrar acceso
					$this->loginModel->acceso($row[0]->usuario,$row[0]->id_sucursal);
					//enviar respuesta (notifica que el logeo se realizo correctamente)
					echo json_encode("true");
				}else{
					echo json_encode("false");
				}
            }else{
                echo json_encode("false");
            }
        }
        
        public function sesion(){
			/*echo "<pre>";
			print_r($this->session->userdata('permisos'));
			echo "</pre><br><br><br>";*/
            if($this->session->userdata('usuario')){
                return "session";
            }else{
                return "sin sesion";
            }
        }
        
        public function ruta(){
            echo FCPATH;
        }
		
		public function real(){
            echo $this->loginModel->getRealIP();
        }
        
        public function sinsesion(){
            $this->session->sess_destroy();
			echo "true";
        }
}
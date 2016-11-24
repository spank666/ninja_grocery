<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class usuarios extends CI_Controller {

	/*
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
		$this->load->model('usuariosModel');
	}
    
	
	public function niveles(){
		if($this->revisar_sesion()){
			echo str_repeat(' ', 40000);
			
			ob_start('ob_gzhandler');
			
			
			ob_end_flush();
			ob_flush();
			flush();
			$result=$this->usuariosModel->niveles();
			echo json_encode($result);
		}else{
			echo json_encode("sesion");
		}
	}
        
	public function usuarios(){
		switch ($this->revisar_sesion()) {
			case "sesion":
				echo json_encode("sesion");
			break;
			case "permiso":
				echo json_encode("permiso");
			break;
			case "true":
				echo str_repeat(' ', 40000);
				ob_start('ob_gzhandler');
				
				$result=$this->usuariosModel->usuarios();
				
				ob_end_flush();
				ob_flush();
				flush();
				echo json_encode($result);
			break;
		}
	}
        
        public function usuarioCompleto(){
            if($this->revisar_sesion()){
                echo str_repeat(' ', 40000);
                
                ob_start('ob_gzhandler');
                
                
                ob_end_flush();
                ob_flush();
                flush();
                $result=$this->usuariosModel->usuarioCompleto($this->input->post("id"));
                echo json_encode($result);
            }else{
                echo json_encode("sesion");
            }
	}
        
        public function insertarUsuario(){
            $this->form_validation->set_rules('usuario','Usuario','trim|required');
            $this->form_validation->set_rules('pass','Contra','required');
            $this->form_validation->set_rules('rpass','RContra','required|matches[pass]');
            $this->form_validation->set_rules('nombre','Nombre','trim|required');
            $this->form_validation->set_rules('apellido','Apellido','trim|required');
            $this->form_validation->set_rules('nivel','Nivel','trim|required');
            $this->form_validation->set_rules('sucursal','Sucursal','trim|required');
            
            if($this->input->post("correo")!=""){
                $this->form_validation->set_rules('correo','Correo','trim|valid_email|required');
            }

            //$this->form_validation->set_message('min_length', 'El Campo %s debe tener un Minimo de %d Caracteres');

            if($this->revisar_sesion()){
                if($this->form_validation->run() == FALSE){
                    echo json_encode("validation");
                }else{

                    $result=$this->usuariosModel->insertarUsuario();
                    echo json_encode($result);
                }
            }else{
                echo json_encode("sesion");
            }
        }
        
        public function modificarUsuario(){
            $this->form_validation->set_rules('pass','Contra','trim');

            $this->form_validation->set_rules('nombre','Nombre','trim|required');
            $this->form_validation->set_rules('apellido','Apellido','trim|required');
            $this->form_validation->set_rules('nivel','Nivel','trim|required');
            $this->form_validation->set_rules('sucursal','Sucursal','trim|required');
            
            if($this->input->post("correo")!=""){
                $this->form_validation->set_rules('correo','Correo','trim|valid_email|required');
            }

            //$this->form_validation->set_message('min_length', 'El Campo %s debe tener un Minimo de %d Caracteres');

            if($this->revisar_sesion()){
                if($this->form_validation->run() == FALSE){
                    echo json_encode("validation");
                }else{

                    $result=$this->usuariosModel->modificarUsuario();
                    echo json_encode($result);
                }
            }else{
                echo json_encode("sesion");
            }
        }
        
        function bloquearUsuario(){
            if($this->revisar_sesion()){
                $result=$this->usuariosModel->bloquearUsuario();
                echo json_encode($result);
            }else{
                echo json_encode("sesion");
            }
        }
        
        function eliminarUsuario(){
            if($this->revisar_sesion()){
                $result=$this->usuariosModel->eliminarUsuario();
                echo json_encode($result);
            }else{
                echo json_encode("sesion");
            }
        }
        
        function sucursales(){
            if($this->revisar_sesion()){
                $result=$this->usuariosModel->sucursales();
                echo json_encode($result);
            }else{
                echo json_encode("sesion");
            }
        }
		
	function revisarme(){
		echo $this->revisar_sesion();
	}

	private function revisar_sesion(){
		if($this->session->userdata('usuario')){
			if (in_array("1", $this->session->userdata('permisos'))){
				return "true";
			}else{
				return "permiso";
			}
		}else{
			return "sesion";
		}
	}
}
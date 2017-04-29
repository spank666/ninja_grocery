<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class usuarios extends CI_Controller {

	function __construct(){
		// Call the Model constructor
		parent::__construct();
		switch ($this->revisar_sesion()) {
			case "sesion":
				echo json_encode("sesion");
				exit;
			break;
			case "permiso":
				echo json_encode("permiso");
				exit;
			break;
		}
		$this->load->helper('url');
		$this->load->model('usuariosModel');
	}
    
	
	public function niveles(){
		$result=$this->usuariosModel->niveles();
		echo json_encode($result);
	}
        
	public function usuarios(){
				ob_start('ob_gzhandler');
				$result=$this->usuariosModel->usuarios();
				echo json_encode($result);
				header("X-Content-Length: ".ob_get_length()."\r\n");
				ob_end_flush();
				/*
				ob_start();
				ob_start('ob_gzhandler');
				$resultado=$this->usuariosModel->usuarios();
				$nuevo_resultado=array_merge($resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado,$resultado);
				echo json_encode($nuevo_resultado,JSON_UNESCAPED_UNICODE);
				$len=ob_get_length();
				ob_end_flush();
				header('Content-Length: '.ob_get_length()."\r\n");
				header('Accept-Ranges: bytes'."\r\n");
				header("X-Content-Length: ".$len."\r\n");
				ob_end_flush();
				*/
	}
        
	public function usuarioCompleto(){
		$result=$this->usuariosModel->usuarioCompleto($this->input->post("id"));
		echo json_encode($result);
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

            
                if($this->form_validation->run() == FALSE){
                    echo json_encode("validation");
                }else{

                    $result=$this->usuariosModel->insertarUsuario();
                    echo json_encode($result);
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

                if($this->form_validation->run() == FALSE){
                    echo json_encode("validation");
                }else{

                    $result=$this->usuariosModel->modificarUsuario();
                    echo json_encode($result);
                }
        }
        
        function bloquearUsuario(){
                $result=$this->usuariosModel->bloquearUsuario();
                echo json_encode($result);
        }
        
        function eliminarUsuario(){
                $result=$this->usuariosModel->eliminarUsuario();
                echo json_encode($result);
        }
        
        function sucursales(){
                $result=$this->usuariosModel->sucursales();
                echo json_encode($result);
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
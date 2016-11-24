<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class sistema extends CI_Controller {

	function __construct(){
		// Call the Model constructor
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('sistemaModel');
	}
    
	public function index(){
		if($this->session->userdata('usuario')){
			echo str_repeat(' ', 40000);			
			ob_start();
			ob_end_flush();
			ob_flush();
			flush();
			$this->load->view('sistema.html');
		}else{
			redirect(base_url());
		}
	}
        
    public function menu(){
    	if($this->revisar_sesion()){
			echo str_repeat(' ', 40000);
			ob_start();
			$result=$this->sistemaModel->menu();
			ob_end_flush();
			ob_flush();
			flush();
			
			echo json_encode($result);
		}else{
			echo json_encode("sesion");
		}
	}
        
        public function perfil(){
            if($this->revisar_sesion()){
                echo str_repeat(' ', 40000);
                ob_start('ob_gzhandler');
                
                $result=$this->sistemaModel->perfil();
                
                ob_end_flush();
                ob_flush();
                flush();
                echo json_encode($result);
            }else{
                echo json_encode("sesion");
            }
	}
        
        private function revisar_sesion(){
            return $this->session->userdata('usuario');
        }
}

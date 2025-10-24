class Gokul{	
	
	void dance(){
		System.out.println("Gokul is a dancer");
	}
	
	void cartoons(){
		System.out.println("Tom and Jerry");
	}
	
	Gokul(String name){
		System.out.println("This is constructor "+name);
	}
	
	public static void main(String [] args){
			Gokul xerox = new Gokul("Haii");
			xerox.dance();
			xerox.cartoons();
	}
	

}
import java.awt.*;
import java.util.ArrayList;
import javax.swing.*;

class Mess {
    String name, location, contact, holiday;
    int price;

    String[] menu = {
            "Mon: Chapati + Bhaji",
            "Tue: Dal + Rice",
            "Wed: Paneer",
            "Thu: Mix Veg",
            "Fri: Sweet + Thali",
            "Sat: Special Meal"
    };

    Mess(String n, String l, int p, String c, String h) {
        name = n;
        location = l;
        price = p;
        contact = c;
        holiday = h;
    }
}

public class MessFinderApp {

    static ArrayList<Mess> messList = new ArrayList<>();
    static ArrayList<Mess> cart = new ArrayList<>();

    static String name = "", email = "", address = "", contact = "";

    static JPanel mainPanel;
    static JTextField searchField;

    static Color BG = new Color(245,248,252);
    static Color PRIMARY = new Color(20,30,60);
    static Color ACCENT = new Color(0,150,136);
    static Color ORANGE = new Color(255,140,0);
    static Color ADDED = new Color(200,255,200); // green

    public static void main(String[] args){
        addData();
        authPage();
    }

    // DATA
    static void addData(){
        String[] locs = {"Kasaba Bawada","Jadhavwadi","Kadamwadi","Tarabai Park",
                "CBS Stand","Market Yard","Ruikar Colony","Mahanagar Palika"};

        String[] names = {
                "Mage Wani Mess","Annapurna Tiffin","Aai's Kitchen",
                "Shree Datta Mess","Royal Thali House","Yummy Meals",
                "Student's Choice Mess","Ghar Ka Swad","Sai Bhojanalaya"
        };

        int index = 0;
        for(String l:locs){
            for(int i=0;i<7;i++){
                messList.add(new Mess(
                        names[index % names.length],
                        l,2000+i*200,"98"+i+"654321","Sunday"
                ));
                index++;
            }
        }
    }

    static JButton btn(String t){
        JButton b = new JButton(t);
        b.setBackground(ACCENT);
        b.setForeground(Color.WHITE);
        return b;
    }

    // AUTH
    static void authPage(){
        JFrame f = new JFrame("Login");
        f.setSize(500,500);
        f.setLayout(new GridBagLayout());
        f.getContentPane().setBackground(BG);

        JPanel card = new JPanel(new GridLayout(10,1,8,8));
        card.setPreferredSize(new Dimension(350,380));
        card.setBackground(Color.WHITE);
        card.setBorder(BorderFactory.createEmptyBorder(20,20,20,20));

        JTextField n=new JTextField();
        JTextField e=new JTextField();
        JTextField a=new JTextField();
        JTextField c=new JTextField();
        JPasswordField p=new JPasswordField();

        card.add(new JLabel("Name")); card.add(n);
        card.add(new JLabel("Email")); card.add(e);
        card.add(new JLabel("Address")); card.add(a);
        card.add(new JLabel("Contact")); card.add(c);
        card.add(new JLabel("Password")); card.add(p);

        JButton login=btn("Login");
        JButton signup=btn("Signup");

        JPanel bp=new JPanel();
        bp.add(login); bp.add(signup);

        JPanel wrap=new JPanel(new BorderLayout());
        wrap.add(new JLabel("Create Account / Login",JLabel.CENTER),BorderLayout.NORTH);
        wrap.add(card,BorderLayout.CENTER);
        wrap.add(bp,BorderLayout.SOUTH);

        f.add(wrap);

        login.addActionListener(x->{save(n,e,a,c); f.dispose(); welcome();});
        signup.addActionListener(x->{save(n,e,a,c); f.dispose(); welcome();});

        f.setLocationRelativeTo(null);
        f.setVisible(true);
    }

    static void save(JTextField n,JTextField e,JTextField a,JTextField c){
        name=n.getText();
        email=e.getText();
        address=a.getText();
        contact=c.getText();
    }

    // WELCOME
    static void welcome(){
        JOptionPane.showMessageDialog(null,"Welcome to Nearby Mess Finder");

        JFrame f=new JFrame();
        f.setSize(300,200);

        JButton start=new JButton("START");
        start.setBackground(ORANGE);
        start.setForeground(Color.WHITE);
        start.setFont(new Font("Arial",Font.BOLD,16));

        f.add(start);

        start.addActionListener(e->{f.dispose(); mainUI();});
        f.setLocationRelativeTo(null);
        f.setVisible(true);
    }

    // MAIN UI
    static void mainUI(){
        JFrame frame=new JFrame("Nearby Mess Finder");
        frame.setSize(1100,650);
        frame.setLayout(new BorderLayout());

        JPanel top=new JPanel(new BorderLayout());
        top.setBackground(PRIMARY);

        JLabel left=new JLabel(" Welcome "+name);
        left.setForeground(Color.WHITE);

        JPanel center=new JPanel();
        searchField=new JTextField(20);
        searchField.setText("Search mess by location...");
        JButton search=btn("Search");

        center.add(searchField);
        center.add(search);

        JButton profile=btn("Profile");

        top.add(left,BorderLayout.WEST);
        top.add(center,BorderLayout.CENTER);
        top.add(profile,BorderLayout.EAST);

        frame.add(top,BorderLayout.NORTH);

        mainPanel=new JPanel(new GridLayout(0,3,20,20));
        mainPanel.setBackground(BG);

        frame.add(new JScrollPane(mainPanel));

        show(messList);

        search.addActionListener(e->{
            String val=searchField.getText().toLowerCase();
            ArrayList<Mess> list=new ArrayList<>();
            for(Mess m:messList){
                if(m.location.toLowerCase().contains(val)){
                    list.add(m);
                }
            }
            show(list);
        });

        profile.addActionListener(e->openProfile());

        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
    }

    // PROFILE
    static void openProfile(){
        JFrame f = new JFrame("Profile");
        f.setSize(450,500);
        f.setLayout(new BorderLayout());

        JTextArea info = new JTextArea();
        info.setEditable(false);
        info.setText(
                "Name: "+name+
                "\nEmail: "+email+
                "\nAddress: "+address+
                "\nContact: "+contact+
                "\n\nCart Items:"
        );

        f.add(info, BorderLayout.NORTH);

        DefaultListModel<String> model = new DefaultListModel<>();
        for(Mess m : cart){
            model.addElement(m.name + " (" + m.location + ")");
        }

        JList<String> list = new JList<>(model);
        f.add(new JScrollPane(list), BorderLayout.CENTER);

        JPanel btnPanel = new JPanel();

        JButton view = new JButton("View Details");
        JButton remove = new JButton("Remove Selected");
        JButton clear = new JButton("Clear Cart");

        btnPanel.add(view);
        btnPanel.add(remove);
        btnPanel.add(clear);

        f.add(btnPanel, BorderLayout.SOUTH);

        view.addActionListener(e -> {
            int i = list.getSelectedIndex();
            if(i >= 0){
                Mess m = cart.get(i);
                JOptionPane.showMessageDialog(f,
                        "Name: " + m.name +
                        "\nLocation: " + m.location +
                        "\nPrice: Rs." + m.price +
                        "\nHoliday: " + m.holiday +
                        "\nContact: " + m.contact
                );
            }
        });

        remove.addActionListener(e -> {
            int i = list.getSelectedIndex();
            if(i >= 0){
                cart.remove(i);
                f.dispose();
                openProfile();
            }
        });

        clear.addActionListener(e -> {
            cart.clear();
            f.dispose();
            openProfile();
        });

        f.setLocationRelativeTo(null);
        f.setVisible(true);
    }

    // MENU
    static void menu(Mess m){
        JFrame f=new JFrame("Menu");
        f.setSize(250,250);
        f.setLayout(new GridLayout(6,1));
        for(String s:m.menu){
            f.add(new JLabel(s));
        }
        f.setVisible(true);
    }

    // DISPLAY (GREEN FEATURE)
    static void show(ArrayList<Mess> list){
        mainPanel.removeAll();

        for(Mess m:list){

            JPanel card=new JPanel(new GridLayout(7,1,5,5));

            // highlight if added
            if(cart.contains(m)){
                card.setBackground(ADDED);
            } else {
                card.setBackground(Color.WHITE);
            }

            card.setBorder(BorderFactory.createLineBorder(Color.GRAY));

            card.add(new JLabel(m.name));
            card.add(new JLabel("Location: "+m.location));
            card.add(new JLabel("Price: Rs."+m.price));
            card.add(new JLabel("Holiday: "+m.holiday));
            card.add(new JLabel("Contact: "+m.contact));

            JButton menu=btn("Menu");
            JButton add=btn("Add");
            JButton remove=btn("Remove");

            menu.addActionListener(e->menu(m));

            add.addActionListener(e->{
                if(!cart.contains(m)){
                    cart.add(m);
                    show(list);
                }
            });

            remove.addActionListener(e->{
                cart.remove(m);
                show(list);
            });

            JPanel p=new JPanel();
            p.add(menu); p.add(add); p.add(remove);

            card.add(p);

            mainPanel.add(card);
        }

        mainPanel.revalidate();
        mainPanel.repaint();
    }
}
